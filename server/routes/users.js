const express = require('express');
const router = express.Router();
const userRouter = router
const Client = require('../models/clients')
const admin = require('../Roles/FirebaseService/firebase.config')


userRouter.get("/", async (req, res) => {

  const { email, password } = req.body;

  // Authenticate the user with Firebase Auth
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const uid = userRecord.uid;

    // Verify the user's password with Firebase Auth
    await admin.auth().signInWithEmailAndPassword(email, password);

    // Get the user's custom claims
      const idToken = await admin.auth().createCustomToken(uid);
      const customClaims = (await admin.auth().verifyIdToken(idToken)).role;

    // Get the user's role from the database using Sequelize ORM
    const client = await Client.findOne({ where: { email: email } });
    const role = client.role;

    // Compare the user's role in the database to their custom claim
    if (role === customClaims) {
      console.log('User has access to the app.');
      res.json({ client: client, role: role });
    } else {
      console.log('User does not have access to the app.');
      console.log(client.role)

      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(401).send('Unauthorized');
    console.log(email)
  }

});

module.exports = userRouter;
