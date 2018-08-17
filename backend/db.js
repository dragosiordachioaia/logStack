let MONGODB_URI =
  "mongodb://dragos:screwsentry999@ds245661.mlab.com:45661/logstack-dev";

let mongoose = require("mongoose");

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);
let connection = mongoose.connection;

connection.on("error", console.error.bind(console, "connection error:"));

connection.once("open", function() {
  console.log("database connection open");
  // Wait for the database connection to establish, then start the app.
});

module.exports = mongoose;
