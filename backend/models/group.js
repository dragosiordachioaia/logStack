let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let GroupSchema = new Schema({
  message: String,
  type: String,
  projectID: String,
  history: Object,
});

module.exports = mongoose.model("Group", GroupSchema);
