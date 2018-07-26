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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let port = process.env.PORT || 5555; // set our port

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api/v1/", router);

// START THE SERVER
// =============================================================================
app.listen(port);

app.use(express.static(__dirname + "/static"));

app.get("*", function(req, res) {
  console.log("req:", req.url);
  res.sendfile(__dirname + req.url);
});

console.log("Magic happens on port " + port);
