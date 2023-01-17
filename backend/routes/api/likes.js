const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Like = mongoose.model("Like");
const { requireUser } = require("../../config/passport");

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

// POST /api/likes
router.post("/", requireUser,  async (req, res, next) => {
  try {
    const newLike = new Like({
      photoId: req.body.photoId,
      likerId: req.body.likerId,
    });
    let like = await newLike.save();
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

