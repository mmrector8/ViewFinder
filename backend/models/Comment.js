const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    body: {
        type: String,
        required: true
    },
    userId: {
        // type: String,
        // required: true
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    spotId: {
        // type: String,
        // required: true
        type: Schema.Types.ObjectId,
        ref: 'Spot',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);