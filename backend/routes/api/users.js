const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const { loginUser, restoreUser } = require("../../config/passport");
const { isProduction } = require("../../config/keys");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");
const DEFAULT_PROFILE_IMAGE_URL =
  "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/def-user-pfp.png";

// POST /api/users/register
router.post(
  "/register",
  singleMulterUpload("image"),
  validateRegisterInput,
  async (req, res, next) => {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (user) {
      const err = new Error("Validation Error");
      err.statusCode = 400;
      const errors = {};
      if (user.email === req.body.email) {
        errors.email = "A user has already registered with this email";
      }
      if (user.username === req.body.username) {
        errors.username = "A user has already registered with this username";
      }
      err.errors = errors;
      return next(err);
    }
    const profilePicUrl = req.file
      ? await singleFileUpload({ file: req.file, public: true })
      : DEFAULT_PROFILE_IMAGE_URL;

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      bio: req.body.bio,
      profilePicUrl: profilePicUrl,
      photos: req.body.photos,
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
        if (err) throw err;
        try {
          newUser.hashedPassword = hashedPassword;
          const user = await newUser.save();
          return res.json(await loginUser(user));
        } catch (err) {
          next(err);
        }
      });
    });
  }
);

// POST /api/users/login
router.post("/login", validateLoginInput, async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

// GET /api/users/current
router.get("/current", restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  return res.json({
    // user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      bio: req.user.bio,
      profilePicUrl: req.user.profilePicUrl,
      photos: req.user.photos
    // }
  });
});

router.get("/:userId", async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId)
      .populate({
        path: "photos",
        populate: { path: "likes", select: "likerId photoId" },
      })
      .populate({
        path: "photos",
        populate: { path: "spotId", select: "name" },
      })
      .populate({
        path: "photos",
        populate: { path: "userId", select: "_id username" },
      });


    return res.json(user)
  } catch (err) {
    const error = new Error("User not found");
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
});

module.exports = router;
