var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SchoolSchema = new Schema({
  name: String,
  admin: { type: Schema.Types.ObjectId, ref: "User" },
  staff: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date },
});

module.exports = mongoose.model("School", SchoolSchema);
