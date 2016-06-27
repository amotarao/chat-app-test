<?php

$mail  = htmlspecialchars($_POST['mail']);

$sql = "SELECT * FROM `User` WHERE `mail` = '{$mail}' AND `invalid` = 0 LIMIT 1;";
$user = $pdo->query($sql)->fetch(PDO::FETCH_ASSOC);

if($user['mail']==$mail){
    $key = md5(uniqid(rand(),1));
    
    $sql = "UPDATE `User` SET `passKey` = :passKey WHERE `id` = '{$user['id']}'";
    $update = $pdo->prepare($sql);
    $update->bindValue(':passKey', $key);
    $update->execute();
    
    mb_language("japanese");
    mb_internal_encoding("UTF-8");
    
    $to = $user['mail'];
    $subject = '[Chat App] 登録URL送付';
    $message = <<<EOD
EOD;

    $header = "From:C Factory<webmaster@c.jpn.io>\n";

    mb_send_mail($to, $subject, $message, $header, "-fwebmaster@c.jpn.io" );
}