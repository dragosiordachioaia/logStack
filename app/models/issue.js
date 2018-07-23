let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let IssueSchema = new Schema({
  message: String,
  colno: Number,
  filename: String,
  lineno: Number,
  timeStamp: Number,
  type: String,
  stack: String,
});

module.exports = mongoose.model("Issue", IssueSchema);
