var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LessonSchema = new Schema({
  classgroup: { type: Schema.Types.ObjectId, ref: "Classgroup" },
  teacher: [{ type: Schema.Types.ObjectId, ref: "User" }],
  week: Number,
  day: { type: String, enum: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  period: Number,
  //   createdAt: { type: Date },
});

module.exports = mongoose.model("Lesson", LessonSchema);
