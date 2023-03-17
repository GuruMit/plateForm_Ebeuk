const express = require("express");
const router = express.Router();
const claimRoute = router;
const Client = require("../models/clients");
const admin = require("../Roles/FirebaseService/firebase.config");
 
//Firebase Custome Claims

  claimRoute.post('/', async (req, res) => {

    const uid = req.params.uid;
  
    try {
      // Find the client in the database
      const client = await Client.findByPk(uid);
  
      // Set the custom claims for the client
      await admin.auth().setCustomUserClaims(uid, { role: client.role });
  
      res.status(200).send('Custom claims set successfully.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to set custom claims.');

      
    }
  });

module.exports = claimRoute;





// // const express = require("express");
// // const router = express.Router();
// // const claimRoute = router;
// // const Client = require("../models/clients");
// // //Firebase Custome Claims
// // const admin = require('../Roles/FirebaseService/firebase.config')

// // claimRoute.post("/claimeRoute", async (req, res) => {
// //   const authToken = req.headers.authorization;
// //   const token = authToken.split(" ")[1];
// //   console.log("User token:", token);

// //   // Verify the token
// //   try {
// //     const decodedToken = await admin.auth().verifyIdToken(token);
// //     const uid = decodedToken.uid;

// //     // Client.beforeCreate(async(Clients) =>{
// //     //     const {uid} = await admin.auth().verifyIdToken(token)
// //     //     Clients.id = uid
// //     //     console.log('new ID added')
// //     //   })

// //     // function to retrieve User Role from the Database

// //     // const getUserRole = async (UserID) => {
    
// //     //   const client = await Client.findOne({ where: { id: UserID } });
// //     //   return client.role;
// //     // // };

// //     // const setCustomClaim = async (UserID) => {
// //     //   const userRole = await getUserRole(UserID);
// //     //   await admin.auth().setCustomUserClaims(UserID, { role: userRole });
// //     // };

// //     // // Call setCustomClaim function for a specific user ID
// //     // setCustomClaim(uid)
// //     //   .then(() => console.log("Custom claim set successfully"))
// //     //   .catch((error) => console.error("Error setting custom claim:", error));

// //     console.log("TOKEN VERIFIED Successfully");
// //   } catch (error) {
// //     console.error("Error verifying token:", error);
// //     res.status(401).send("Unauthorized");
// //   }

// //   // Handle the request
// //   // ...
// // });

// // module.exports = claimRoute;
