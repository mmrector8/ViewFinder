const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");

const DEFAULT_PROFILE_IMAGE_URL =
  "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/def-user-pfp.png"; 

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    initializeImages();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

const initializeImages = async () => {
  console.log("Initializing profile avatars...");
  await User.updateMany({}, { profilePicUrl: DEFAULT_PROFILE_IMAGE_URL });

  console.log("Done!");
  mongoose.disconnect();
};
