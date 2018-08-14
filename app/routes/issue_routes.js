let Issue = require("../models/issue");
let Group = require("../models/group");
let Project = require("../models/project");

module.exports = router => {
  router.route("/issues").post((request, response) => {
    console.log();
    let issue = new Issue();
    for (let prop in request.body) {
      if (prop !== "config") {
        issue[prop] = request.body[prop];
      }
    }
    for (let prop in request.body.config) {
      issue[prop] = request.body.config[prop];
    }
    issue.ip = request.ip;

    console.log("request message:", request.body.message);
    Group.findOne({ message: request.body.message }).then(
      existingGroup => {
        console.log("existing group: ", existingGroup);

        if (existingGroup) {
          console.log("group exists");
          issue.groupID = existingGroup.id;
          existingGroup.instances++;
          existingGroup.save();
          saveIssue(issue, response);
        } else {
          console.log("group does NOT exist");
          let newGroup = new Group();
          newGroup.message = issue.message;
          newGroup.type = issue.type;
          newGroup.instances = 1;
          newGroup.save().then(
            groupRecord => {
              issue.groupID = groupRecord.id;
              saveIssue(issue, response);
            },
            error => {
              response.send(error);
            }
          );
        }
      },
      error => response.send(error)
    );
  });

  function saveIssue(issue, response) {
    issue.save().then(
      issueRecord => {
        response.json({ id: issueRecord.id });
      },
      error => {
        response.send(error);
      }
    );
  }

  router.route("/issues/:issue_id").get((request, response) => {
    Issue.find({ _id: request.params.id }).then(
      issue => {
        response.json(issue);
      },
      error => {
        response.send(error);
      }
    );
  });

  router.route("/issues").get((request, response) => {
    Issue.find().then(
      result => {
        response.json(result);
      },
      error => {
        response.send(error);
      }
    );
  });
};
