const express = require("express");
const router = express.Router();
const clientRouter = router;
const Client = require("../models/clients");

// // POST /api/client pour ajouter un client a la base de données
clientRouter.post("/", async (req, res) => {
  const { prenom, nom, email, selectedOption, phone, password } = req.body;

  try {
    // Check if email already exists
    const client = await Client.findOne({ where: { email: email } });
    if (client) {
      return res.status(400).send("Email already in use");
    } else {
      // Create new client
      const nouveauClient = await Client.create({
        prenom: prenom,
        nom: nom,
        email: email,
        phone: phone,
        password: password,
        selectedOption: selectedOption,
      });
      console.log(`Nouveau Client ajouter`);
     return res.status(201).json(nouveauClient);

    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// // GET request to fetch all utilisateurs
clientRouter.get('/', async (req, res) => {
  try {
    const nouveauClient = await Client.findAll();
    console.log(nouveauClient.every(user => user instanceof Client)); // true
    console.log("All users:", JSON.stringify(nouveauClient, null, 2));
    res.status(200).json(nouveauClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = clientRouter;