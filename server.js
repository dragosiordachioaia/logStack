// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var MONGODB_URI =
  "mongodb://dragos:screwsentry999@ds245661.mlab.com:45661/logstack-dev";

var mongoose = require("mongoose");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var conn = mongoose.connection;

conn.on("error", console.error.bind(console, "connection error:"));

conn.once("open", function() {
  console.log("connection open");
  // Wait for the database connection to establish, then start the app.
});

var Issue = require("./app/models/issue");

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log("Something is happening.");
  next(); // make sure we go to the next routes and don't stop here
});

router
  .route("/issues")

  // create an issue (accessed at POST http://localhost:8080/api/issues)
  .post(function(req, res) {
    var issue = new Issue(); // create a new instance of the Issue model
    issue.title = req.body.title; // set the issue name (comes from the request)

    // save the issue and check for errors
    issue.save(function(err) {
      if (err) res.send(err);

      res.json({ message: "Issue created!" });
    });
  });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function(req, res) {
  console.log("Mongoose ready state: ", mongoose.connection.readyState);
  res.json({ message: "hooray! welcome to our api!" });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
