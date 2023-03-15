///////////////////////////////
// Dependencies
////////////////////////////////
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
// create application object
const app = express();
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");

///////////////////////////////
// Application Settings
////////////////////////////////
require("dotenv").config();
 
const { 
   PORT = 3001,
   DATABASE_URL, 
   GOOGLE_PRIVATE_KEY_ID, 
   GOOGLE_PRIVATE_KEY, 
   GOOGLE_CLIENT_ID } = process.env;


  
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "react-people-apps-c44af",
    "private_key_id": GOOGLE_PRIVATE_KEY_ID,
    "private_key": GOOGLE_PRIVATE_KEY ,
    "client_email": "firebase-adminsdk-bundx@react-people-apps-c44af.iam.gserviceaccount.com",
    "client_id":GOOGLE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bundx%40react-people-apps-c44af.iam.gserviceaccount.com"
  })
});
///////////////////////////////
// Database Connection
////////////////////////////////
mongoose.set('strictQuery', false)
mongoose.connect(DATABASE_URL);
// Mongo connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(`MongoDB Error: ${error.message}`));
const peoplesRoutes = require('./routes/peoplesRoutes');

///////////////////////////////
// Models
////////////////////////////////

///////////////////////////////
// Mount Middleware
////////////////////////////////
app.use(cors()); 
app.use(morgan("dev")); 
app.use(express.json()); // creates req.body 

// middleware is a function that gets invoked for every request
// process information from that request
// 1) read info from the request
// 2) modify or delete information from the request
// 3) log information from the request

// authorization/authentication middleware
app.use(async function(req, res, next) {
  // capture the token
  const token = req.get('Authorization');
  if(token) {
    const user = await getAuth().verifyIdToken(token.replace('Bearer ', ''));
    // adding a logged in user to the request object
    req.user = user;
  } else {
    req.user = null;
  }
  next();
});

function isAuthenticated(req, res, next) {
  if(!req.user) { 
    return res.status(401).send('you must logged in first');
  }
  next();
}

///////////////////////////////
// Mount Routes
////////////////////////////////


// People namespace
app.use('/people', isAuthenticated, peoplesRoutes);

///////////////////////////////
// Tell the app to listen
////////////////////////////////
app.listen(PORT, () => {
  console.log(`Express is listening on port: ${PORT}`);
});
