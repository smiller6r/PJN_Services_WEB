<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Získání hodnot z formuláře
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

    // Kontrola, zda jsou vyplněna všechna pole
    if (empty($name) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Prosím, vyplňte formulář a zkuste to znovu.";
        exit;
    }

    // Nastavení příjemce zprávy
    $recipient = "pjel@seznam.cz";

    // Nastavení hlaviček zprávy
    $headers = "From: $name <$email>";

    // Odeslání e-mailu
    if (mail($recipient, $subject, $message, $headers)) {
        http_response_code(200);
        echo "Děkujeme, vaše zpráva byla odeslána.";
    } else {
        http_response_code(500);
        echo "Něco se pokazilo a vaše zpráva nebyla odeslána. Prosím, zkuste to znovu později.";
    }
} else {
    http_response_code(403);
    echo "Nastala chyba při zpracování vašeho požadavku. Prosím, zkuste to znovu.";
}
?>
