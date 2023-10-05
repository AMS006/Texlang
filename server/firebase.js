const admin = require('firebase-admin');
require('dotenv').config()

const credentials = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: "firebase-adminsdk-cda99@texlang.iam.gserviceaccount.com",
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cda99%40texlang.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const db = admin.firestore();

module.exports = { db };