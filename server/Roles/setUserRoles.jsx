var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Set custom claims for a user based on their role
const setCustomClaims = async (uid, role) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`Custom claims set for user ${uid}: ${JSON.stringify({ role })}`);
  } catch (error) {
    console.error(`Error setting custom claims for user ${uid}:`, error);
  }
};


