const redisClient = require("../redis");
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

let SimpleIssue = require("../models/simple_issue");
let Group = require("../models/group");
let Project = require("../models/project");

let os = require("os-utils");

let mainStartTime;
let mainEndTime;
let mainDuration;

module.exports = router => {
  router.route("/groups/:group_id").get((request, response) => {
    SimpleIssue.find({ groupID: request.params.group_id }).then(
      simpleIssues => {
        let history = getGroupHistory(simpleIssues);
        result.history = history;
        response.json({
          message: simpleIssues[0].message,
          history,
          _id: simpleIssues[0].group_id,
        });
      },
      error => {
        response.send(error);
      }
    );
  });

  router
    .route("/projects/:project_id/groups")
    .get(async (request, response) => {
      const CACHE_KEY = `groups_${request.params.project_id}`;
      let rawCachedData;
      try {
        rawCachedData = await redisClient.getAsync(CACHE_KEY);
      } catch (e) {}
      let cachedData;
      if (rawCachedData) {
        cachedData = JSON.parse(rawCachedData);
      }
      if (cachedData) {
        console.warn("WE HAVE CACHED DATA");
        response.json(cachedData);
        return;
      } else {
        console.warn("WE DO NOT HAVE CACHED DATA");
      }

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
              let groupsWithHistory = attachHistoryToGroups(groups, simpleIssues);

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
    let simpleIssuesForGroup = simpleIssues.filter(simpleIssue => simpleIssue.groupID == group._id);
    let groupHistory = getGroupHistory(simpleIssuesForGroup);
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
