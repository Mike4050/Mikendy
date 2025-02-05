<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = htmlspecialchars($_POST["nom"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $telephone = htmlspecialchars($_POST["telephone"]);
    $sujet = htmlspecialchars($_POST["sujet"]);
    $message = htmlspecialchars($_POST["message"]);

    // Vérification des champs obligatoires
    if (empty($nom) || empty($email) || empty($message)) {
        die("Tous les champs obligatoires doivent être remplis.");
    }

    // Vérification de l'email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Adresse email invalide.");
    }

    // Initialisation de PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configuration SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'esternymikendy8@gmail.com'; // Ton email
        $mail->Password = 'nwnx sole jdmf pgyw'; // Mot de passe d'application Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Expéditeur et destinataire
        $mail->setFrom('esternymikendy8@gmail.com', 'Formulaire de Contact'); // Utiliser ton email
        $mail->addReplyTo($email, $nom); // Répondre à l'email du client
        $mail->addAddress('esternymikendy8@gmail.com'); // Email de réception

        // Contenu du mail
        $mail->isHTML(false);
        $mail->Subject = "Nouveau message de contact : $sujet";
        $mail->Body = "Nom : $nom\nEmail : $email\nTéléphone : $telephone\n\nMessage :\n$message";

        // Envoi du mail
        if ($mail->send()) {
            header("Location: merci.html"); // Redirection après envoi
            exit();
        } else {
            error_log("Erreur lors de l'envoi : " . $mail->ErrorInfo);
            die("Erreur lors de l'envoi du message.");
        }
    } catch (Exception $e) {
        error_log("Erreur PHPMailer : " . $e->getMessage());
        die("Erreur lors de l'envoi du message.");
    }
}
?>
