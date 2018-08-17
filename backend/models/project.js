let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ProjectSchema = new Schema({
  name: String,
  language: String,
});

module.exports = mongoose.model("Project", ProjectSchema);
