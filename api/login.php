<?php

require 'key/key.php';
require 'class/model.php';
require 'class/model-user.php';

class User
{
    private $login_status = false;
    private $login_user_id = null;
    
    private $UserModel;
    
    public function __construct()
    {
        $this->UserModel = new UserModel();
        
        if (!array_key_exists('HTTP_AUTHORIZATION', $_SERVER)) return false;
        $auth = $_SERVER['HTTP_AUTHORIZATION'];
        if (strpos($auth, 'Bearer ') === false) return false;
        $token = preg_replace("/^Bearer /", '', $auth);
        
        $user_id = $this->UserModel->getUserIdFromToken($token);
        if (false === $user_id) return false;
        
        $this->login_status = true;
        $this->login_user_id = $user_id;
        
        return true;
    }
    
    public function login()
    {
        if (!isset($_POST['mail']) || !isset($_POST['password'])) return false;
        
        $mail = $_POST['mail'];
        $mail = htmlspecialchars($mail);
        $mail = strtolower($mail);
        
        $password = $_POST['password'];
        $password = htmlspecialchars($password);
        
        $loginCheck = $this->UserModel->tryLogin($mail, $password);
        
        if (!$loginCheck) return false;
        
        while (true) {
            $token = sha1(uniqid(microtime()));
            $checkToken = $this->UserModel->checkToken($token);
            if (!$checkToken) break;
        }
        
        $this->UserModel->registToken($mail, $token);
        
        $this->login_status = true;
        $this->login_user_id = $this->UserModel->getUserIdFromToken($token);
        
        $data = array(
            "statusCode" => 200,
            "data" => array(
                "loginResult" => true,
                "token" => $token
            ),
        );
        $json = json_encode($data, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        
        header("Content-Type: application/json; charset=utf-8");
        echo $json;
        
        return true;
    }
    
    public function logout()
    {
        $this->UserModel->deleteTokenFromUserId($this->login_user_id);
        
        $data = array(
            "statusCode" => 200,
            "data" => array(
                "logoutResult" => true,
            ),
        );
        
        $this->login_status = false;
        $this->login_user_id = null;
        
        $json = json_encode($data, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        
        header("Content-Type: application/json; charset=utf-8");
        echo $json;
        
        return true;
    }
}

$User = new User();
$User->login();
