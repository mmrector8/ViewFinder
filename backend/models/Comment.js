const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
    body: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    spotId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);