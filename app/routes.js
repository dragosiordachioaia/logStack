let express = require("express");

let mongoose = require("./db");

let router = express.Router();
let getIP = require("ipware")().get_ip;

// middleware to use for all requests
router.use(function(req, res, next) {
  next(); // make sure we go to the next routes and don't stop here
});

require("./routes/issue_routes")(router);
require("./routes/project_routes")(router);
require("./routes/group_routes")(router);

module.exports = router;
