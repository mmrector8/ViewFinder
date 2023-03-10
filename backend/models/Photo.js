const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = Schema(
    {
        url: {
            type: String, 
            required: true
        },
        spotId: {
            type: Schema.Types.ObjectId,
            ref: "Spot",
            required: true 
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            // type: String, 
            required: true 
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        genre: {
            type: String,
            required: true 
        },
        description: {
            type: String
        },
        condition: [{
            type: String,
            required: true 
        }],
        transportation: [{
            type: String, 
            required: true 
        }],
        bestTimeOfDay: {
            type: String, 
            required: true 
        },
        payment: {
            type: String,
            required: true 
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: "Like"
            // type: Number
        }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Photo", photoSchema);