// Main starting point of the application
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const requireAuth = require("./routes/auth");

const path = require("path");
// Serve static files from the React frontend app

// set up DB
// mongoose.connect(`mongodb://localhost:27017/reqs-db`);
const { MONGO_PASS } = process.env;
try {
  mongoose.connect(
    `mongodb+srv://reqs-admin:${MONGO_PASS}@reqs-cluster-0-k8nns.mongodb.net/test?retryWrites=true`,
    { useNewUrlParser: true }
  );
} catch (error) {
  next(error);
}

// Anything that doesn't match the above, send back index.html
app.use(morgan("combined"));
app.use(cors());
const jsonParser = bodyParser.json({ type: "*/*" });

var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
var reqsRouter = require("./routes/reqs");
var schoolsRouter = require("./routes/schools");
var uploadRouter = require("./routes/upload");
var lessonsRouter = require("./routes/lessons");

app.use(express.static(path.join(__dirname, "client", "build")));
app.use("/auth", jsonParser, authRouter);
app.use("/users", jsonParser, usersRouter);
app.use("/reqs", jsonParser, reqsRouter);
app.use("/schools", jsonParser, schoolsRouter);
app.use("/lessons", jsonParser, lessonsRouter);
app.use("/upload", uploadRouter);

app.get("*", function(req, res) {
  const index = path.join(__dirname, "client", "build", "index.html");
  res.sendFile(index);
});
// error handling
app.use(function(error, req, res, next) {
  console.log(error);
  res.status(500).send({
    data: null,
    error: { message: error.message || "Somthing went wrong!" },
  });
});

module.exports = app;
