var express = require("express");
var Issue = require("./models/issue");
var mongoose = require("./db");

var router = express.Router();
var getIP = require('ipware')().get_ip;

// middleware to use for all requests
router.use(function(req, res, next) {
  console.log("Something is happening.");
  next(); // make sure we go to the next routes and don't stop here
});

router.route("/issues").post((request, response) => {
  console.log("request.body:");
  console.log(request.body);

  let issue = new Issue();
  for(let prop in request.body) {
    issue[prop] = request.body[prop];
  }
  issue.ip = request.ip;

  issue.save().then(
    record => {
      response.json({ id: record.id });
    },
    error => {
      response.send(error);
    }
  );
});

router.route("/issues/:issue_id").get((request, response) => {
  Issue.find({ _id: request.params.issue_id }).then(
    issue => {
      response.json(issue);
    },
    error => {
      response.send(error);
    }
  );
});

router.route("/issues/").get((request, response) => {
  Issue.find().then(
    issue => {
      response.json(issue);
    },
    error => {
      response.send(error);
    }
  );
});

module.exports = router;
