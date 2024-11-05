const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, company, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: email, 
    to: "contact@kevinprevost.fr", 
    subject: subject,
    text: `Nom : ${name}\nCompagnie : ${company}\n\nMessage : ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("E-mail envoyé avec succès!");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail:", error);
    res.status(500).json({ error: error.message });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
