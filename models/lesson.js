var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LessonSchema = new Schema({
  teacher: { type: Schema.Types.ObjectId, ref: "User" },
  school: { type: Schema.Types.ObjectId, ref: "School" },
  classgroup: { type: String },
  week: Number,
  day: { type: String, enum: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  period: Number,
  room: String,
});

module.exports = mongoose.model("Lesson", LessonSchema);
