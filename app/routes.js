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
  console.log("request.body:");
  console.log(request.body);
  let issue = new Issue();
  issue.message = request.body.message;
  issue.colno = request.body.colno;
  issue.lineno = request.body.lineno;
  issue.filename = request.body.filename;
  issue.timeStamp = request.body.timeStamp;
  issue.type = request.body.type;
  issue.stack = request.body.stack;

  // message: String,
  // colno: Number,
  // filename: String,
  // lineno: Number,
  // timeStamp: Number,
  // type: String,
  // stack: String,

  issue.save().then(
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
