const { json } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const { requireUser } = require('../../config/passport');
const validateCommentInput = require('../../validations/comments');


router.get("/", async(req, res, next)=>{
    try {
        const comments = await Comment.find();
        return res.json(comments);
    } catch (err) {
        console.error(err);
        return res.json([]);
    }
});

router.patch('/:id', requireUser, validateCommentInput, async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true})
            if(!comment){
                return res.json({message: "comment not found"});
            }
        return res.json(comment)
    }
    catch (err) {
        const error = new Error('Comment could not be updated')
        const statusCode = 422;
        error.errors = {message: "Comment could not be updated"}
        return next(err);
    }
});

router.delete('/:id', requireUser, async (req, res, next) => {
        try {
            let id = req.params.id
            let comment = Comment.findOneAndDelete({ _id: id }, function (err, comment) {
                if(comment) {
                    return res.json({ message: "Comment deleted!" })
                }
            });
        }
        catch (err) {
            const error = new Error('Comment could not be deleted')
            const statusCode = 422;
            error.errors = { message: "Comment could not be deleted" }
            return next(err);
        }
});

router.post('/spots/:spotId', requireUser, validateCommentInput, async (req, res, next) => { 
     try {
            const newComment = new Comment({
                body: req.body.body,
                userId: req.user._id,
                spotId: req.params.spotId
            });

            let comment = await newComment.save();
            comment = await comment.populate('_id', '_id, body, userId, spotId');
            return res.json(comment);
        }
    catch (err) {
        return next(err);
        }
});

module.exports = router;
