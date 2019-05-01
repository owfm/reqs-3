var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var reqsRouter = require("./routes/reqs");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/reqs", reqsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var mongoose = require("mongoose");

const { MONGO_USER } = process.env;
const { MONGO_PASS } = process.env;

const URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@reqs-cluster-0-k8nns.mongodb.net/reqs-main?retryWrites=true`;
const MONGOOSE_OPTIONS = { useNewUrlParser: true };

mongoose.connection.once("open", function() {
  console.info("MongoDB event open");
  console.info("MongoDB connected [%s]", URI);

  mongoose.connection.on("connected", function() {
    console.info("MongoDB event connected");
  });

  mongoose.connection.on("disconnected", function() {
    console.warn("MongoDB event disconnected");
    mongoose.connect(URI, { server: { auto_reconnect: true } });
  });

  mongoose.connection.on("reconnected", function() {
    console.info("MongoDB event reconnected");
  });

  mongoose.connection.on("error", function(err) {
    console.error("MongoDB event error: " + err);
  });

  // return resolve();
  return;
});

mongoose.connect(URI, MONGOOSE_OPTIONS, function(err) {
  if (err) {
    console.error("MongoDB connection error: " + err);
    // return reject(err);
  }
});
module.exports = app;
