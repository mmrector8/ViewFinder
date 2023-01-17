const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = Schema(
  {
    photoId: {
      type: Schema.Types.ObjectId,
      ref: "Photo",
      require: true
    },
    likerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Like", likeSchema);
