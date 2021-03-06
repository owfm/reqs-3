var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SchoolSchema = new Schema(
  {
    name: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: "User" },
    staff: [{ type: Schema.Types.ObjectId, ref: "User" }],
    preferences: Schema.Types.Mixed,
    createdAt: { type: Date },
  },
  { strict: "throw" }
);

SchoolSchema.post("save", function(error, doc, next) {
  next(new Error("Could not save new school."));
});

module.exports = mongoose.model("School", SchoolSchema);

// const defaultSchoolPreferences = {
//   periods: 6,
//   periodStartTimes: {
//     1: newDate().setHours(9),
//     2: newDate().setHours(10),
//     3: newDate().setHours(11, 20)
//   }
// }
