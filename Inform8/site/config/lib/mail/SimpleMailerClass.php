<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */

class SimpleMailer {

  function sendPlainTextEmail($to, $subject, $body) {
    require_once 'config/lib/mail/class.phpmailer.php';
    include 'config/includes/mail/settings.php';

    $mail = new PHPMailer(); // defaults to using php "mail()"
    $mail->From = $emailSettings['email'];
    $mail->FromName = $emailSettings['emailName'];
    $mail->Subject = $subject;
    $mail->AddAddress($to);
    $mail->Body = $body;
    return $mail->Send();
  }


}

?>