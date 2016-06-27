<?php

class Model
{
    protected $db;
    
    public function __construct()
    {
        global $dbInfo;
        
        try {
            $dsn = sprintf(
                'mysql:host=%s;dbname=%s;charset=utf8;',
                $dbInfo['host'],
                $dbInfo['dbname']
            );
            $this->db = new PDO($dsn, $dbInfo['dbuser'], $dbInfo['password']);
            
        } catch(PDOException $e) {
            var_dump($e->getMessage());
            exit;
        }
    }
    
    public function __destruct()
    {
        $this->db = null;
    }
}
