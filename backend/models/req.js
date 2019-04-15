var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReqSchema = new Schema({
  draft: { type: Boolean, default: true },
  isDone: { type: Boolean, default: false },
  createdAt: { type: Date },
  updatedAt: { type: Date, default: Date.now },
  title: String,
  equipment: String,
  notes: String,
  period: {
    type: Number,
    min: 1,
    max: 6
  },
  day: {
    type: String,
    enum: ["Mon", "Tue", "Wed", "Thu", "Fri"]
  }
});

module.exports = mongoose.model("Req", ReqSchema);
