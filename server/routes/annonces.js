const express = require("express");
const router = express.Router();
const annonceRouter = router;
const Annonce = require("../models/annonces");

// POST /api/client pour ajouter une annonce a la base de données
annonceRouter.post("/", async (req, res) => {
  const { prenom, nom, phone, prestation, description, detail , urgence ,budget , profile ,region , secteur } = req.body;

  try {
       // Create Annonce
      const annonce = await Annonce.create({
        nom: nom,
        prenom: prenom,
        phone: phone,
        prestation: prestation,
        description: description,
        detail: detail,
        urgence: urgence,
        budget: budget,
        profile: profile,
        region: region,
        secteur:secteur
      });
      console.log(`Nouvelle Annonce ajouter`);
     return res.status(201).json(annonce);


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server errors sur ajout annonce" });
  }
});

// GET request to fetch all annonces
annonceRouter.get('/', async (req, res) => {
  try {
    const annonce = await Annonce.findAll();
    console.log(annonce.every(annce => annce instanceof Annonce)); // true
    console.log("All users:", JSON.stringify(annonce, null, 2));
    res.status(200).json(annonce);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error sur get annonces' });
  }
});

module.exports = annonceRouter;
