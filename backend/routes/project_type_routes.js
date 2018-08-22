const PROJECT_TYPES = [
  {
    name: "javascript",
    icon: "fa fa-js",
  },
  {
    name: "react",
    icon: "fa fa-react",
  },
  {
    name: "python",
    icon: "fa fa-python",
  },
];
module.exports = router => {
  router.route("/project_types").get((request, response) => {
    response.json(PROJECT_TYPES);
  });
};
