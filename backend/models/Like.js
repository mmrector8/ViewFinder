const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = Schema(
  {
    photoId: {
      type: Schema.Types.ObjectId,
      ref: "Photo",
      required: true
    },
    likerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Like", likeSchema);
