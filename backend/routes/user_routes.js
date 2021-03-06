let bcrypt = require("bcryptjs");

let Issue = require("../models/issue");
let Group = require("../models/group");
let Project = require("../models/project");
let User = require("../models/user");

module.exports = router => {
  router.route("/users").post((request, response) => {
    let newUser = new User();
    // for (let prop in request.body) {
    //   newUser[prop] = request.body;
    // }
    newUser.username = request.body.username;
    newUser.email = request.body.email;
    // newUser.password = request.body.password;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(request.body.password, salt);
    newUser.password = hash;

    newUser.save().then(
      record => {
        response.json({ id: record.id });
      },
      error => {
        response.send(error);
      }
    );
  });

  router.route("/users/me").get((request, response) => {
    if (!request.session.user) {
      response.status(404);
      response.end("No user is logged in");
      return;
    }
    getUserById(request, response, request.session.user._id);
  });

  router.route("/users/:id").get((request, response) => {
    console.log("looking for a user");
    getUserById(request, response, request.params.id);
  });

  router.route("/login").post((request, response) => {
    if (request.session.user) {
      response.status(400);
      response.end("You are already logged in");
    } else {
      User.findOne({ username: request.body.username }).then(
        userData => {
          console.log("request.body.password = ", request.body.password);
          console.log("userData.password = ", userData.password);
          let passwordMatch = bcrypt.compareSync(
            request.body.password,
            userData.password
          ); // true
          if (passwordMatch) {
            request.session.user = {
              username: userData.username,
              email: userData.email,
              _id: userData._id
            };
            console.log("password matches");
            console.log(request.session.user);
            response.end("OK");
          } else {
            response.status(401);
            response.send("User and password combination does not match");
          }
        },
        error => {
          response.status(404);
          response.send(error);
        }
      );
    }
  });

  router.route("/logout").post((request, response) => {
    if (request.session.user) {
      delete request.session.user;
      response.end("OK");
    } else {
      response.status(400);
      response.end("You are already logged out");
    }
  });

  router.route("/projects").get((request, response) => {
    Issue.all().then(
      result => {
        response.json(result);
      },
      error => {
        response.send(error);
      }
    );
  });
};

function getUserById(request, response, userID) {
  User.findById(userID).exec((err, userData) => {
    if (err) response.send(err);
    console.log("found the user");
    Project.find({ _id: { $in: userData.projects } }).then(
      projects => {
        userData.projects = projects;
        response.json(userData);
      },
      error => response.send(error)
    );
  });
}
