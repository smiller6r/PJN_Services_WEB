<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';

if (isset($_POST['send'])) {
    $name = htmlentities($_POST['name']);
    $email = htmlentities($_POST['email']);
    $subject = htmlentities($_POST['subject']);
    $message = htmlentities($_POST['message']);

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.seznam.cz';
    $mail->SMTPAuth = true;
    $mail->Username = 'pjel@seznam.cz';
    $mail->Password = 'smiller3287*';
    $mail->Port = 465;
    $mail->SMTPSecure = 'ssl';
    $mail->isHTML(true);
    $mail->setFrom($email, $name); // Nastav� odes�latele podle �daj� z formul��e

    // Nastaven� adresy p��jemce, p�edm�tu a obsahu zpr�vy
    $mail->addAddress('pjel@seznam.cz');
    $mail->Subject = $subject;
    $mail->Body = $message;

    // Pokus� se odeslat e-mail
    if ($mail->send()) {
        echo 'E-mail byl �sp�n� odesl�n.';
    } else {
        echo 'Do�lo k chyb� p�i odes�l�n� e-mailu: ' . $mail->ErrorInfo;
    }
}



?>