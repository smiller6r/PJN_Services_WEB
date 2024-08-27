<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

try {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Pøevedení jména a pøedmìtu na UTF-8
    $name = mb_convert_encoding($name, 'UTF-8');
    $subject = mb_convert_encoding($subject, 'UTF-8');

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'websmtp.cesky-hosting.cz';
    $mail->SMTPAuth = true;
    $mail->Username = 'pjnservices.eu';
    $mail->Password = 'smiller3287*';
    $mail->Port = 25;
    $mail->SMTPSecure = 'tls';
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8'; // Nastavení kódování UTF-8
    $mail->setFrom('info@pjnservices.eu', $name); // Nastaví odesílatele podle údajů z formuláře
    // Nastavení adresy příjemce, předmětu a obsahu zprávy
    $mail->addAddress('info@pjnservices.eu');
    $mail->addCC($email);
    $mail->Subject = $subject;
    $mail->Body = $message;

    // Pøidání pøíloh
    if (!empty($_FILES['attachment']['name'][0])) {
        // Cyklus pro pøidání všech pøíloh
        for ($i = 0; $i < count($_FILES['attachment']['name']); $i++) {
            $attachment = $_FILES['attachment']['tmp_name'][$i];
            $attachment_name = $_FILES['attachment']['name'][$i];
            $mail->addAttachment($attachment, $attachment_name);
        }
    }

    // Pokusí se odeslat e-mail
    $mail->send();
    //echo 'Message has been sent';
} catch (Exception $e) {
    //echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>



