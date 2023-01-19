const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    profilePicUrl:{
      type: String
    }, 
    photos: [{
      type: Schema.Types.ObjectId, 
      ref: "Photo"
    }], 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
