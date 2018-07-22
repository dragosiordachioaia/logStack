// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
let express = require("express"); // call express
let app = express(); // define our app using express
let bodyParser = require("body-parser");
let router = require("./routes");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080; // set our port

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
