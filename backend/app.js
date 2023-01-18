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
require("./models/Like")
require("./models/Comment")
require("./models/Photo")

const passport = require("passport");

const usersRouter = require("./routes/api/users");
const csrfRouter = require("./routes/api/csrf");
const locationRouter = require("./routes/api/locations")
const spotRouter = require("./routes/api/spots"); 
const likeRouter = require("./routes/api/likes")
const commentRouter = require("./routes/api/comments")
const photoRouter = require("./routes/api/photos")
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
app.use("/api/likes", likeRouter)
app.use("/api/comments", commentRouter);
app.use("/api/photos", photoRouter)

if (isProduction) {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  app.get('/', (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });
}

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

// Serve static React build files statically in production


module.exports = app;
