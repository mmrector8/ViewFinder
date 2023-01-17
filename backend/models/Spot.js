const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotSchema = Schema(
    {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        photos: [{
            type: Schema.Types.ObjectId,
            ref: 'Photo'
        }]
    },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Spot", spotSchema);