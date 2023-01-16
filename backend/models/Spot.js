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
            required: true,
        },
        comments: [{
            type: String
        }],
        photos: [{
            type: String 
        }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Spot", spotSchema);