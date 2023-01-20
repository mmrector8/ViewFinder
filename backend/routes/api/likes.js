const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Like = mongoose.model("Like");
const { requireUser } = require("../../config/passport");
const Photo = mongoose.model("Photo");

// GET /api/likes
router.get("/", async (req, res, next) => {
  try {
    const likes = await Like.find();
    return res.json(likes);
  } catch (err) {
    console.error(err);
    return res.json([]);
  }
});

// POST /api/likes/photos/:photoId
router.post("/photos/:photoId", requireUser,  async (req, res, next) => {
  try {
    debugger
    const newLike = new Like({
      photoId: req.params.photoId,
      likerId: req.user._id,
    });
    let like = await newLike.save();
    await Photo.updateOne({ _id: like.photoId },{ $push: { likes: like._id } });
    
    // like = await like.populate("_id", "_id, likerId, photoId")
    return res.json(like);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/likes/:id 
router.delete("/:id", requireUser, async (req, res, next) => {
  try {
        let id = req.params.id;
        let like = await Like.findOneAndDelete({_id: id});
        if (like) {
          await Photo.updateOne(
            { _id: like.photoId },
            { $pull: { likes: like._id } }
          );
          return res.json({message: "Like successfully deleted"})
        }
        
  } catch (err) {
        const error = new Error("Delete Like failed");
        error.statusCode = 404;
        error.errors = {
          message: "Failed to delete like",
        };
    return next(error);
  }
});

module.exports = router;

