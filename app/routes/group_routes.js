let Issue = require("../models/issue");
let Group = require("../models/group");
let Project = require("../models/project");

module.exports = router => {
  router.route("/groups/:group_id").get((request, response) => {
    Group.find({ _id: request.params.group_id }).then(
      result => {
        response.json(result);
      },
      error => {
        response.send(error);
      }
    );
  });

  router.route("/groups").get((request, response) => {
    Group.find().then(
      result => {
        response.json(result);
      },
      error => {
        response.send(error);
      }
    );
  });
};
