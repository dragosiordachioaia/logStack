var MONGODB_URI =
  "mongodb://dragos:screwsentry999@ds245661.mlab.com:45661/logstack-dev";

var mongoose = require("mongoose");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var connection = mongoose.connection;

connection.on("error", console.error.bind(console, "connection error:"));

connection.once("open", function() {
  console.log("connection open");
  // Wait for the database connection to establish, then start the app.
});

module.exports = mongoose;
