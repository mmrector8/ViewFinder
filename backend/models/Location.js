const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = Schema(
  {
    county: {
      type: String,
      required: true,
    },
    // zipcode: {
    //   type: String,
    //   required: true,
    // },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    spots: [
      {
        type: Schema.Types.ObjectId,
        ref: "Spot",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Location", locationSchema);
