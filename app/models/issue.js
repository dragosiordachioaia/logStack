let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let IssueSchema = new Schema({
  // generic
  message: String,
  type: String,
  navigator: Object,
  ip: String,
  context: Object,
  user: Object,
  projectId: String,
  breadcrumbs: Array,
  tags: Array,

  // error-specific
  colno: Number,
  filename: String,
  lineno: Number,
  timeStamp: Number,
  stack: String,
});

module.exports = mongoose.model("Issue", IssueSchema);
