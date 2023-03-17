const express = require("express");
const router = express.Router();
const clientRouter = router;
const Client = require("../models/clients");
const admin = require("../Roles/FirebaseService/firebase.config");

// // POST /api/client pour ajouter un client a la base de données
clientRouter.post("/", async (req, res) => {
  const { prenom, nom, email, selectedOption, phone, password, role } =
    req.body;
  try {
    // Check if email already exists
    const client = await Client.findOne({ where: { email: email } });
    if (client) {
      return res.status(400).send("Email already in use");
    } else {
      // Get the user UID from the Firebase token

      const authToken = req.headers.authorization;
      const token = authToken.split(" ")[1];
      console.log("User token:", token);

      // Verify the token
      try {
        const { uid } = await admin.auth().verifyIdToken(token);

        // Create new client with user UID as ID
        const nouveauClient = await Client.create({
          id: uid,
          prenom: prenom,
          nom: nom,
          email: email,
          phone: phone,
          password: password,
          selectedOption: selectedOption,
          role: role,
        });

        // Set the custom claim for the user role
        try {
          const { uid } = await admin.auth().verifyIdToken(token);

          // Retrieve the user's role from the database using Sequelize ORM
          const client = await Client.findOne({ where: { id: uid } });

          if(client) {
          // Set custom claim for user role
          const role = client.role;
          const customClaims = { role: role };
          await admin.auth().setCustomUserClaims(uid, customClaims);
          console.log(`Custom claim for user ${uid} has been set`);
          //set display name
          const name = client.nom;
          // Update the user's display name in Firebase Auth
          await admin.auth().updateUser(uid, { displayName: name });
          console.log(`Display name for user ${uid} has been set to ${name}`);

          }else{

            console.log('User Id not found')
          }

        } catch (error) {
          console.error("Error setting custom claim:", error);
          console.error("Error setting display name:", error);
          return res
            .status(500)
            .json({ message: "Failed to set custom claim for user" });
        }

        console.log(`Nouveau Client ajouter`);
        console.log("User id is " + uid);
        return res.status(201).json(nouveauClient);
      } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).send("Unauthorized");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }

  // Handle the request
});

// // GET request to fetch all utilisateurs
clientRouter.get("/", async (req, res) => {
  try {
    const nouveauClient = await Client.findAll();
    console.log(nouveauClient.every((user) => user instanceof Client)); // true
    console.log("All users:", JSON.stringify(nouveauClient, null, 2));
    res.status(200).json(nouveauClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
//

// clientRouter.get("/role", async (req, res) => {
//   try {
//     const authToken = req.headers.authorization;
//     const token = authToken.split(" ")[1];
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     const uid = decodedToken.uid;

//     // Get the user's role from the custom claims
//     const user = await admin.auth().getUser(uid);
//     const role = user.customClaims.role;

//     return res.status(200).json({ role: role });
//   } catch (error) {
//     console.error("Error getting user role:", error);
//     return res.status(500).json({ message: "Failed to get user role" });
//   }
// });

// clientRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//      // Check if email already exists
//     const client = await Client.findOne({ where: { email: email } });
//     if (client) {
//       return res.status(400).send("Email already in use");
//     } else {
//       // Get the user UID from the Firebase token
//       const authToken = req.headers.authorization;
//       const token = authToken.split("")[1];
//       console.log("User token:", token);
//     }

//   const { uid } = await admin.auth().verifyIdToken(token);
//   console.log(uid)

//   // try {

//   //   // Retrieve client data from client table based on client UID
//   //   const clientData = await Client.findOne({ where: { id: clientId } });
//   //   if (!clientData) {
//   //     return res.status(401).json({ message: "Client not found" });
//   //   }

//   //   // Retrieve custom claim for client role
//   //   const customClaims = await admin.auth().getUser(clientData.id);
//   //   const role = customClaims.customClaims.role;

//   //   return res.status(200).json({ clientData, role });
//   // } catch (error) {
//   //   console.error("Erreur lors de la connexion", error);
//   //   return res.status(401).json({ message: "Unauthorized" });
//   // }
// });

clientRouter.post("/login", async (req, res) => {
  const { email, password, role } =
    req.body;

  try {
     // Check if email already exists
    const client_bd = await Client.findOne({ where: { email: email } });
    if(client_bd){

      const authToken = req.headers.authorization;

      if (authToken) {
        const token = authToken.split(" ")[1];
        console.log("User token:", token);
        // Retrieve client data from client table based on client UID
        const { uid } = await admin.auth().verifyIdToken(token);
        // Check if email already exists
        const clientdata = await Client.findOne({ where: { id: uid } });
  
        if (clientdata) {
          // const customClaims = await admin.auth().getUser(uid);
          // Retrieve the user's role from the database using Sequelize ORM
          const role = clientdata.role;
          // set custom claim for user Role
          const customClaims = { role: role };
          await admin.auth().setCustomUserClaims(uid, customClaims);
          console.log(`Custom claim for user ${uid} has been set`);
          // check the user role
          const userRole = await admin.auth().getUser(uid);
          if (userRole && userRole.customClaims && userRole.customClaims.role === role) {
            console.log("User role is valid.");
            // Return a response indicating that the user is authenticated and their role is valid
            return res.status(200).json({
              message: "Authentication successful.",
              role: role,
            });
          }  else {
            console.log("User role is invalid.");
            // Return a response indicating that the user's role is invalid
            return res.status(401).json({
              message: "Authentication failed: Invalid user role.",
            });
          }
        }
      }p

    }
   
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: " server error" });
  }

  // Handle the request
});

module.exports = clientRouter;
