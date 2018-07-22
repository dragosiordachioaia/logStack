let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let IssueSchema = new Schema({
  title: String,
});

module.exports = mongoose.model("Issue", IssueSchema);
