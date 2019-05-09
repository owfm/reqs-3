var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReqSchema = new Schema({
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
  lesson: { type: Schema.Types.ObjectId, ref: "Lesson" },
  // period: {
  //   type: Number,
  //   min: 1,
  //   max: 6,
  // },
  // day: {
  //   type: String,
  //   enum: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  // },
});

module.exports = mongoose.model("Req", ReqSchema);
