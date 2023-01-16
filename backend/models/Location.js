const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = Schema(
  {
    zipcode: {
      type: String,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
    },
    spots: [{
        type: String,
        // type: Schema.Types.ObjectId,
        ref: "Spot"
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Location", locationSchema);
