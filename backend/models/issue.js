let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let IssueSchema = new Schema({
  // generic
  message: String,
  type: String,
  userAgent: String,
  ip: String,
  context: Object,
  user: Object,
  breadcrumbs: Array,
  tags: Array,
  groupID: String,
  projectID: String,
  date: String,
  dateISO: String,
  dateISOShort: String,
  device: Object,

  // error-specific
  colno: Number,
  filename: String,
  lineno: Number,
  timeStamp: Number,
  stack: String,
});

module.exports = mongoose.model("Issue", IssueSchema);
