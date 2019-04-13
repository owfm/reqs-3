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

// getting-started.js
var mongoose = require("mongoose");

const { MONGO_USER } = process.env;
const { MONGO_PASS } = process.env;

const URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@reqs-cluster-0-k8nns.mongodb.net/test?retryWrites=true`;
mongoose.connect(URI, { useNewUrlParser: true });

module.exports = app;
