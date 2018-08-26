const redisClient = require("../redis");
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);
const _ = require("lodash");

let SimpleIssue = require("../models/simple_issue");
let Issue = require("../models/issue");
let Group = require("../models/group");
let Project = require("../models/project");

let os = require("os-utils");

let mainStartTime;
let mainEndTime;
let mainDuration;

module.exports = router => {
  router.route("/groups/merge").post((request, response) => {
    let groupsToMerge = request.body;
    let groupToKeep = groupsToMerge[0];
    let groupsToDelete = groupsToMerge.slice(1);

    Group.find({ _id: { $in: groupsToDelete } }).then(
      groupsToDeleteData => {
        let groupsToDeleteMessages = groupsToDeleteData.map(
          group => group.messages
        );
        Group.findById(groupToKeep).then(groupToKeepData => {
          if (!groupToKeepData) {
            response.status(500);
            response.end("Could not find group to keep");
            return;
          }
          let newMessages = groupsToDeleteMessages.concat(
            groupToKeepData.messages
          );
          let newMessagesFlat = _.flattenDeep(newMessages);
          groupToKeepData.messages = newMessages;
          groupToKeepData.save();

          Issue.updateMany(
            { groupID: { $in: groupsToDelete } },
            { groupID: groupToKeep }
          ).then(
            () => {
              SimpleIssue.updateMany(
                { groupID: { $in: groupsToDelete } },
                { groupID: groupToKeep }
              ).then(
                () => {
                  Group.deleteMany({ _id: { $in: groupsToDelete } }).then(
                    () => {}
                  );

                  response.send("OK");
                },
                error => {
                  response.status(500);
                  response.end("Something did not work, check log");
                }
              );
            },
            error => {
              response.status(500);
              response.end("Something did not work, check log");
            }
          );
        });
      },
      error => {
        response.status(500);
        response.end("Something did not work, check log");
      }
    );
  });
  router.route("/groups").delete((request, response) => {
    let IDs = request.body.groups;
    console.log("request.body:", request.body);
    console.log("IDs:", IDs);

    Group.deleteMany({ _id: { $in: IDs } }).then(
      () => {
        Issue.deleteMany({ groupID: { $in: IDs } }).then(
          () => {
            response.send("OK");
          },
          error => {
            response.status(500);
            response.send(error);
          }
        );
      },
      error => {
        response.status(500);
        response.send(error);
      }
    );
  });

  router.route("/groups/ignore").delete((request, response) => {
    let IDs = request.body.groups;
    Group.updateMany({ _id: { $in: IDs } }, { ignored: true }).then(
      () => {
        response.send("OK");
      },
      error => {
        response.status(500);
        response.send(error);
      }
    );
  });

  router.route("/groups/:group_id").get((request, response) => {
    Group.findById(request.params.group_id).then(
      groupData => {
        Issue.find({ groupID: groupData.id })
          .lean()
          .exec((err, issues) => {
            let history = getGroupHistory(issues);
            let users = getGroupUsers(issues);
            response.json({
              _id: request.params.group_id,
              message: groupData.messages[0],
              messages: groupData.messages,
              history,
              users,
            });
          });
      },
      error => response.send(error)
    );
  });

  router
    .route("/projects/:project_id/groups")
    .get(async (request, response) => {
      const CACHE_KEY = `groups_${request.params.project_id}`;
      // let rawCachedData;
      // try {
      //   rawCachedData = await redisClient.getAsync(CACHE_KEY);
      // } catch (e) {}
      // let cachedData;
      // if (rawCachedData) {
      //   cachedData = JSON.parse(rawCachedData);
      // }
      // if (cachedData) {
      //   console.warn("WE HAVE CACHED DATA");
      //   response.json(cachedData);
      //   return;
      // } else {
      //   console.warn("WE DO NOT HAVE CACHED DATA");
      // }

      mainStartTime = Date.now();
      SimpleIssue.find({ projectID: request.params.project_id })
        .lean()
        .select("groupID dateISOShort")
        .exec((err, simpleIssues) => {
          if (err) response.send(err);
          Group.find({ projectID: request.params.project_id })
            .lean()
            .exec(async (err, groups) => {
              if (err) response.send(err);
              mainEndTime = Date.now();
              mainDuration = mainEndTime - mainStartTime;
              console.log("DB duration: ", mainDuration);
              let groupsWithHistory = attachHistoryToGroups(
                groups,
                simpleIssues
              );

              // put the response in the cache for later use
              await redisClient.setAsync(
                CACHE_KEY,
                JSON.stringify(groupsWithHistory),
                "EX",
                20
              );

              response.json(groupsWithHistory);
            });
        });
    });
};

function attachHistoryToGroups(groups, simpleIssues) {
  let startTime = Date.now();
  let groupsWithHistory = [];
  groups.forEach(group => {
    let simpleIssuesForGroup = simpleIssues.filter(
      simpleIssue => simpleIssue.groupID == group._id
    );
    let groupHistory = getGroupHistory(simpleIssuesForGroup);
    group.lastIssue = simpleIssuesForGroup[simpleIssuesForGroup.length - 1];
    group.history = groupHistory;
    groupsWithHistory.push(group);
  });
  let endTime = Date.now();
  let duration = endTime - startTime;
  console.log("data processing duration: ", duration);
  return groupsWithHistory;
}

function getGroupHistory(simpleIssues) {
  let history = {
    count: simpleIssues.length,
    days: {},
  };

  for (let i = 0; i < simpleIssues.length; i++) {
    let simpleIssue = simpleIssues[i];
    if (!history.days[simpleIssue.dateISOShort]) {
      history.days[simpleIssue.dateISOShort] = 0;
    }
    history.days[simpleIssue.dateISOShort]++;
  }
  return history;
}

function getGroupUsers(issues) {
  let users = {
    browser: {},
    browserPercent: {},
    device: {},
    devicePercent: {},
  };
  let isssueCount = issues.length;
  issues.forEach(issue => {
    if (!users.browser[issue.device.browserName]) {
      users.browser[issue.device.browserName] = 0;
    }
    if (!users.device[issue.device.deviceName]) {
      users.device[issue.device.deviceName] = 0;
    }
    users.browser[issue.device.browserName]++;
    users.device[issue.device.deviceName]++;
  });
  for (let browser in users.browser) {
    let occurences = users.browser[browser];
    users.browserPercent[browser] = Math.floor(
      (occurences / isssueCount) * 100
    );
  }
  for (let device in users.device) {
    let occurences = users.device[device];
    users.devicePercent[device] = Math.floor((occurences / isssueCount) * 100);
  }
  return users;
}
