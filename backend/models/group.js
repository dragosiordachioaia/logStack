let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let GroupSchema = new Schema({
  messages: [String],
  type: String,
  projectID: String,
  history: Object,
  ignored: Boolean,
});

module.exports = mongoose.model("Group", GroupSchema);
