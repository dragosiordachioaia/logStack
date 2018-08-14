let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let GroupSchema = new Schema({
  message: String,
  type: String,
  instances: Number,
});

module.exports = mongoose.model("Group", GroupSchema);
