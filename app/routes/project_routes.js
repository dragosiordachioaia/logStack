let Issue = require("../models/issue");
let Group = require("../models/group");
let Project = require("../models/project");

module.exports = router => {
  router.route("/projects").post((request, response) => {
    let newProject = new Project();
    newProject.name = request.body.name;
    newProject.language = request.body.language || "unknown";
    newProject.save().then(
      record => {
        response.json({ id: record.id });
      },
      error => {
        response.send(error);
      }
    );
  });

  router.route("/projects/:id").get((request, response) => {
    Project.find({ _id: request.params.group_id }).then(
      result => {
        response.json(result);
      },
      error => {
        response.send(error);
      }
    );
  });

  router.route("/projects").get((request, response) => {
    Project.find().then(
      result => {
        response.json(result);
      },
      error => {
        response.send(error);
      }
    );
  });
};
