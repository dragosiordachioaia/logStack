// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
let express = require("express"); // call express
let app = express(); // define our app using express
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
// let session = require("express-session");
let session = require("client-sessions");
let morgan = require("morgan");
let router = require("./routes");
let path = require("path");

const redisClient = require("./redis");
app.get("/store/:key", async (req, res) => {
  const { key } = req.params;
  const value = req.query;
  await redisClient.setAsync(key, JSON.stringify(value));
  return res.send("Success");
});
app.get("/:key", async (req, res) => {
  const { key } = req.params;
  const rawData = await redisClient.getAsync(key);
  return res.json(JSON.parse(rawData));
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

app.use(
  session({
    cookieName: "session",
    secret: "random_string_goes_here",
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

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

app.use("/static", express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.sendfile(__dirname + "/static/index.html");
});

// app.use(express.static(path.join(__dirname, "static")));

app.get("/static*", function(req, res) {
  console.log("req:", req.url);
  res.sendfile(__dirname + "/static/index.html");
});

app.get("/*", function(req, res) {
  console.log("req:", req.url);
  res.sendfile(__dirname + "/static/index.html");
});

console.log("logstack server is running on port " + port);
