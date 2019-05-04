var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReqSchema = new Schema({
  draft: { type: Boolean, default: true },
  isDone: { type: Boolean, default: false },
  date: { type: Date },
  createdAt: { type: Date },
  updatedAt: { type: Date, default: Date.now },
  title: { type: String, default: "" },
  equipment: { type: String, default: "" },
  notes: { type: String, default: "" },
  period: {
    type: Number,
    min: 1,
    max: 6,
  },
  day: {
    type: String,
    enum: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
});

module.exports = mongoose.model("Req", ReqSchema);
