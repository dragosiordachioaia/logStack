let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  teams: Array,
});

module.exports = mongoose.model("User", UserSchema);
