// Main starting point of the application
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const requireAuth = require("./routes/auth");

// set up DB
mongoose.connect(`mongodb://localhost:27017/reqs-db`);
// const { MONGO_PASS } = process.env;
// try {
//   mongoose.connect(
//     `mongodb+srv://reqs-admin:${MONGO_PASS}@reqs-cluster-0-k8nns.mongodb.net/test?retryWrites=true`,
//     { useNewUrlParser: true }
//   );
// } catch (error) {
//   next(error);
// }

app.use(morgan("combined"));
app.use(cors());
const jsonParser = bodyParser.json({ type: "*/*" });

var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
var reqsRouter = require("./routes/reqs");
var schoolsRouter = require("./routes/schools");
var uploadRouter = require("./routes/upload");
var lessonsRouter = require("./routes/lessons");

app.use("/auth", jsonParser, authRouter);
app.use("/users", jsonParser, usersRouter);
app.use("/reqs", jsonParser, reqsRouter);
app.use("/schools", jsonParser, schoolsRouter);
app.use("/lessons", jsonParser, lessonsRouter);
app.use("/upload", uploadRouter);

// error handling
app.use(function(error, req, res, next) {
  console.log(error);
  res
    .status(500)
    .send({ data: null, error: { message: "Something went wrong!" } });
});

module.exports = app;
