const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug");

const cors = require("cors");
const csurf = require("csurf");
const { isProduction } = require("./config/keys");

require("./models/User");

require("./config/passport");
require("./models/Location")
require("./models/Spot"); 
//delete this
require("./models/Comment")
const passport = require("passport");

const usersRouter = require("./routes/api/users");

const csrfRouter = require("./routes/api/csrf");
const locationRouter = require("./routes/api/locations")
const spotRouter = require("./routes/api/spots"); 
//delete this
const commentRouter = require("./routes/api/comments")
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

if (!isProduction) app.use(cors());

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use("/api/users", usersRouter);

app.use("/api/csrf", csrfRouter);
app.use("/api/locations", locationRouter);
app.use("/api/spots", spotRouter); 
//delete this
app.use("/api/comments", commentRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug("backend:error");

app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors,
  });
});

module.exports = app;
