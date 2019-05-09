var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClassgroupSchema = new Schema({
  name: String,
  school: { type: Schema.Types.ObjectId, ref: "School" },
  teacher: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date },
  createdAt: { type: Date },
});

module.exports = mongoose.model("Classgroup", ClassgroupSchema);
