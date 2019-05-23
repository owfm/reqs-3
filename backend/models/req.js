var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReqSchema = new Schema({
  teacher: { type: Schema.Types.ObjectId, ref: "User" },
  lesson: { type: Schema.Types.ObjectId, ref: "Lesson" },
  draft: { type: Boolean, default: true },
  isDone: { type: Boolean, default: false },
  hasIssue: { type: Boolean, default: false },
  issueText: String,
  date: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  title: { type: String, default: "" },
  equipment: { type: String, default: "" },
  notes: { type: String, default: "" },
});

module.exports = mongoose.model("Req", ReqSchema);
