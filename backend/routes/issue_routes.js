let moment = require("moment");

let Issue = require("../models/issue");
let SimpleIssue = require("../models/simple_issue");
let Group = require("../models/group");
let Project = require("../models/project");

let os = require("os-utils");

let requests = 0;
module.exports = router => {
  router.route("/issues").post((request, response) => {
    requests++;
    // TODO: un-comment this to see CPU usage
    // if (requests % 10 === 0) {
    //   os.cpuUsage(function(v) {
    //     console.log("CPU Usage (%): " + v);
    //   });
    //   console.log("free memory: ", os.freemem());
    // }

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
    issue.device = getIssueBrowserAndDevice(issue.userAgent);
    let newSimpleIssue = new SimpleIssue();

    newSimpleIssue.message = issue.message;
    newSimpleIssue.type = issue.type;
    newSimpleIssue.context = issue.context;
    newSimpleIssue.user = issue.user;
    newSimpleIssue.tags = issue.tags;
    newSimpleIssue.groupID = issue.groupID;
    newSimpleIssue.projectID = issue.projectID;
    newSimpleIssue.date = issue.date;
    newSimpleIssue.dateISO = issue.dateISO;
    newSimpleIssue.dateISOShort = issue.dateISOShort;
    newSimpleIssue._id = issue._id;

    newSimpleIssue.save();

    issue.save().then(
      issueRecord => {
        // newIssueSimple._id = issueRecord.id;
        response.json({ id: issueRecord.id });
      },
      error => {
        response.send(error);
      }
    );
  }

  router.route("/issues/:issue_id").get((request, response) => {
    Issue.findById(request.params.issue_id).then(
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

function getIssueBrowserAndDevice(agent) {
  let browser = getBrowser(agent);
  let device = getDevice(agent);

  return {
    browserName: browser.name,
    browserVersion: browser.version,
    deviceName: device.name,
    deviceVersion: device.version,
  };
}

function getBrowser(agent) {
  let data = {};
  if (agent.includes("Chrome")) {
    data.name = "Chrome";
  } else if (agent.includes("Chromium")) {
    data.name = "Chromium";
  } else if (agent.includes("Safari")) {
    data.name = "Safari";
  }

  if (agent.includes("Seamonkey")) {
    data.name = "Seamonkey";
  } else if (agent.includes("Firefox")) {
    data.name = "Firefox";
  }
  if (agent.includes("Opera")) {
    data.name = "Opera";
  }
  if (agent.includes("OPR")) {
    data.name = "OPR";
  }
  if (agent.includes("MSIE")) {
    data.name = "Internet Explorer";
  }
  return data;
}

function getDevice(agent) {
  return {};
}