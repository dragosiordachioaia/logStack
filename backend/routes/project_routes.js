let mongoose = require("mongoose");

let Issue = require("../models/issue");
let Group = require("../models/group");
let User = require("../models/user");
let Project = require("../models/project");

module.exports = router => {
  router.route("/projects").post((request, response) => {
    if (!request.session.user) {
      response.status(401);
      response.end("Your are not authorised to see this resource");
    }
    let newProject = new Project();
    (newProject._id = new mongoose.Types.ObjectId()),
      (newProject.name = request.body.name);
    newProject.language = request.body.language || "unknown";
    newProject.save().then(
      newProjectRecord => {
        response.json({ id: newProjectRecord.id });
        console.log("user ID: ", request.session.user._id);
        User.findById(request.session.user._id).then(
          userData => {
            userData.projects.push(newProjectRecord.id);
            userData.save();
          },
          error => response.send(error)
        );
      },
      error => {
        response.send(error);
      }
    );
  });

  router.route("/projects/:id").get((request, response) => {
    if (!request.session.user) {
      response.status(401);
      response.end("Your are not authorised to see this resource");
      return;
    }
    Project.findById(request.params.group_id).then(
      result => {
        response.json(result);
      },
      error => {
        response.send(error);
      }
    );
  });

  router.route("/projects").get((request, response) => {
    if (!request.session.user) {
      response.status(401);
      response.end("Your are not authorised to see this resource");
    }

    User.findById(request.session.user._id).then(
      userData => {
        let projectsForUser = userData.projects.map(projectID => {
          return mongoose.Types.ObjectId(projectID);
        });
        Project.find({
          _id: {
            $in: projectsForUser,
          },
        }).then(
          result => {
            response.json(result);
          },
          error => {
            response.send(error);
          }
        );
      },
      error => {
        response.send(error);
      }
    );
  });
};
