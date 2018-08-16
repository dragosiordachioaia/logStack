let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let SimpleIssueSchema = new Schema({
  // generic
  message: String,
  type: String,
  context: Object,
  user: Object,
  tags: Array,
  groupID: String,
  projectID: String,
  date: String,
  dateISO: String,
  dateISOShort: String,
});

module.exports = mongoose.model("SimpleIssue", SimpleIssueSchema);
