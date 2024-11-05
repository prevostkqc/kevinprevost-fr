<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $name = htmlspecialchars($_POST["name"]);
    $company = htmlspecialchars($_POST["company"]);
    $email = htmlspecialchars($_POST["email"]);
    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    // Adresse de destination
    $to = "contact@kevinprevost.fr";
    // Sujet de l'email
    $emailSubject = "Nouveau message de $name : $subject";
    // Corps de l'email
    $emailBody = "Nom: $name\nCompagnie: $company\nEmail: $email\n\nMessage:\n$message";

    // En-têtes de l'email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";

    // Envoi de l'email
    if (mail($to, $emailSubject, $emailBody, $headers)) {
        echo "E-mail envoyé avec succès!";
    } else {
        echo "Erreur lors de l'envoi de l'e-mail.";
    }
} else {
    echo "Méthode de requête non autorisée.";
}
?>
