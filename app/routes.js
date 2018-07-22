var express = require("express");
var Issue = require("./models/issue");
var mongoose = require("./db");

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  console.log("Something is happening.");
  next(); // make sure we go to the next routes and don't stop here
});

router.route("/issues").post((request, response) => {
  new Issue(request.body).save().then(
    () => {
      response.json({ message: "Issue created!" });
    },
    error => {
      response.send(error);
    }
  );
});

router.route("/issues/:issue_title").get((request, response) => {
  Issue.find({ title: request.params.issue_title }).then(
    issue => {
      response.json(issue);
    },
    error => {
      response.send(error);
    }
  );
});

module.exports = router;
