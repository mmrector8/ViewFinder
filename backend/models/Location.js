const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = Schema(
  {
    county: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
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
