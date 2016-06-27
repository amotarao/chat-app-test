<?php

class UserModel extends Model
{
    protected $db;
    
    public function __construct()
    {
        parent::__construct();
    }
    
    
    /**
     * メールアドレスとパスワードに合うユーザーの存在をチェックする。
     * 存在する場合はtrue、しない場合はfalseを返す。
     *
     * @param str $mail
     * @param str $password
     *
     * @return bool
     */
     
    public function tryLogin($mail, $password)
    {
        $sql = "SELECT `mail`, `password` FROM `Users` WHERE `mail` = '$mail' AND `invalid` = 0 LIMIT 1;";
        $user = $this->db->query($sql)->fetch(PDO::FETCH_ASSOC);
        
        if (null == $user) {
            return false;
        }
        
        if (!password_verify($password, $user['password'])) {
            return false;
        }
        
        return true;
    }
    
    
    /**
     * トークンからユーザーIDを取得する。
     * 存在する場合はユーザーID、存在しない場合はfalseを返す。
     *
     * @param str $token
     *
     * @return int|bool
     */
     
    public function getUserIdFromToken($token)
    {
        $sql = "SELECT `id` FROM `Users` WHERE `token` = '$token' LIMIT 1;";
        $user = $this->db->query($sql)->fetch(PDO::FETCH_ASSOC);
        
        if (null == $user) {
            return false;
        }
        
        return $user['id'];
    }
    
    
    /**
     * トークンの存在をチェックする。
     * 存在する場合はtrue、しない場合はfalseを返す。
     *
     * @param str $token
     *
     * @return bool
     */
     
    public function checkToken($token)
    {
        $sql = "SELECT * FROM `Users` WHERE `token` = '$token' LIMIT 1;";
        $user = $this->db->query($sql)->fetch(PDO::FETCH_ASSOC);
        
        if (null == $user) {
            return false;
        }
        
        return true;
    }
    
    
    /**
     * トークンを登録する。
     * 結果のboolを返す。
     *
     * @param str $mail
     *
     * @return bool
     */
     
    public function registToken($mail, $token)
    {
        $sql = "UPDATE `Users` SET `token` = :token WHERE `mail` = '$mail' AND `invalid` = 0;";
        $update = $this->db->prepare($sql);
        $update->bindValue(':token', $token);
        $update->execute();
        
        return true;
    }
    
    
    /**
     * トークンを破棄する。
     * 結果のboolを返す。
     *
     * @param str $token
     *
     * @return bool
     */
     
    public function deleteToken($token)
    {
        $sql = "UPDATE `Users` SET `token` = :token WHERE `token` = '$token';";
        $update = $this->db->prepare($sql);
        $update->bindValue(':token', null);
        $update->execute();
        
        return true;
    }
    
    
    /**
     * ユーザーIDからトークンを破棄する。
     * 結果のboolを返す。
     *
     * @param str $user_id
     *
     * @return bool
     */
     
    public function deleteTokenFromUserId($user_id)
    {
        $sql = "UPDATE `Users` SET `token` = :token WHERE `id` = '$user_id';";
        $update = $this->db->prepare($sql);
        $update->bindValue(':token', null);
        $update->execute();
        
        return true;
    }
}
