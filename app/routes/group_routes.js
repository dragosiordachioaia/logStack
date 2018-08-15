const redisClient = require("../redis");
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

let Issue = require("../models/issue");
let Group = require("../models/group");
let Project = require("../models/project");

let os = require("os-utils");

let mainStartTime;
let mainEndTime;
let mainDuration;

module.exports = router => {
  router.route("/groups/:group_id").get((request, response) => {
    Issue.find({ groupID: request.params.group_id }).then(
      issues => {
        let history = getGroupHistory(issues);
        result.history = history;
        response.json({
          message: issues[0].message,
          history,
          _id: issues[0].group_id,
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
      Issue.find({ projectID: request.params.project_id })
        .lean()
        .select("dateISOShort")
        .exec((err, issues) => {
          if (err) response.send(err);
          Group.find({ projectID: request.params.project_id })
            .lean()
            .select("")
            .exec(async (err, groups) => {
              if (err) response.send(err);
              mainEndTime = Date.now();
              mainDuration = mainEndTime - mainStartTime;
              console.log("DB duration: ", mainDuration);
              let groupsWithHistory = attachHistoryToGroups(groups, issues);

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

function attachHistoryToGroups(groups, issues) {
  let startTime = Date.now();
  let groupsWithHistory = [];
  groups.forEach(group => {
    let issuesForGroup = issues.filter(issue => issue.groupID === group.id);
    let groupHistory = getGroupHistory(issuesForGroup);
    group.history = groupHistory;
    groupsWithHistory.push(group);
  });
  let endTime = Date.now();
  let duration = endTime - startTime;
  console.log("data processing duration: ", duration);
  return groupsWithHistory;
}

function getGroupHistory(issues) {
  let history = {
    count: issues.length,
    days: {},
  };

  for (let i = 0; i < issues.length; i++) {
    let issue = issues[i];
    if (!history.days[issue.dateISOShort]) {
      history.days[issue.dateISOShort] = 0;
    }
    history.days[issue.dateISOShort]++;
  }
  return history;
}
