var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReqSchema = new Schema({
	title: String,
	equipment: String,
	notes: String
});

module.exports = mongoose.model("Req", ReqSchema);
