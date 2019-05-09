// Main starting point of the application
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const requireAuth = require("./routes/auth");

// set up DB
const { MONGO_PASS } = process.env;
mongoose.connect("mongodb://localhost/auth", { useNewUrlParser: true });

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
var reqsRouter = require("./routes/reqs");
var schoolRouter = require("./routes/schools");

app.use("/auth", authRouter);
app.use("/users", requireAuth, usersRouter);
app.use("/reqs", requireAuth, reqsRouter);
app.use("/schools", schoolRouter);
app.get("/test", function(req, res) {
  res.send({ test: "route" });
});

module.exports = app;
