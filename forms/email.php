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
    $mail->Host = 'smtp.cesky-hosting.cz';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@pjnservices.eu';
    $mail->Password = 'YamahaR6*32877823';
    $mail->Port = 465;
    $mail->SMTPSecure = 'ssl';
    $mail->isHTML(true);
    $mail->setFrom($email, $name); // Nastaví odesílatele podle údajů z formuláře

    // Nastavení adresy příjemce, předmětu a obsahu zprávy
    $mail->addAddress('info@pjnservices.eu');
    $mail->Subject = $subject;
    $mail->Body = $message;

    // Pokusí se odeslat e-mail
    if ($mail->send()) {
        echo 'E-mail byl úspìšnì odeslán.';
    } else {
        echo 'Došlo k chybì pøi odesílání e-mailu: ' . $mail->ErrorInfo;
    }
}



?>
