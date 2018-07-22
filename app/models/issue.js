let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let IssueSchema = new Schema({
  title: String,
});
module.exports = mongoose.model("Issue", IssueSchema);

// import mongoose from "mongoose";
//
// const IssueSchema = mongoose.Schema(
//   {
//     title: { type: String, required: true, unique: true, index: true },
//   },
//   { collection: "Issues" }
// );
//
// let IssuesModel = mongoose.model("Issue", IssueSchema);
//
// IssueModel.getAll = () => {
//   return IssuesModel.find({});
// };
//
// IssueModel.addIssue = issueToAdd => {
//   return issueToAdd.save();
// };
//
// IssueModel.removeIssue = issueName => {
//   return IssuesModel.remove({ name: issueName });
// };
//
// export default IssuesModel;
