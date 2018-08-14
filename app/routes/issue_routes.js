let moment = require("moment");

let Issue = require("../models/issue");
let Group = require("../models/group");
let Project = require("../models/project");

let os = require("os-utils");

let requests = 0;
module.exports = router => {
  router.route("/issues").post((request, response) => {
    requests++;
    if (requests % 10 === 0) {
      os.cpuUsage(function(v) {
        console.log("CPU Usage (%): " + v);
      });
      console.log("free memory: ", os.freemem());
    }

    let crtDate = moment().format("YYYY-MM-DD");
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
    issue.date = Date.now();
    issue.dateISO = moment();
    issue.dateISOShort = crtDate;

    Group.findOne({ message: request.body.message }).then(
      existingGroup => {
        if (existingGroup) {
          issue.groupID = existingGroup.id;
          existingGroup.instances++;
          existingGroup.save();
          saveIssue(issue, response);
        } else {
          let newGroup = new Group();
          newGroup.projectID = issue.projectID;
          newGroup.message = issue.message;
          newGroup.type = issue.type;

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
