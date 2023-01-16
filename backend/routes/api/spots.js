const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Spot = mongoose.model('Spot')

router.get("/", async(req, res, next) => {

    try {
     
        const spots = await Spot.find()
            // .populate("id", "latitude, longitude, name, comments, photos");
        return res.json(spots)
    }
    catch(err) {
        const error = new Error('Spot not found');
        error.statusCode = 404;
        error.errors = { message: "No Spots were found." };
        return next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    
    try {
      
        const spot = await Spot.findById(req.params.id)
            // .populate("id", "latitude, longitude, name, comments, photos");
        return res.json(spot)
    }
    catch {
        const error = new Error('Spot not found');
        error.statusCode = 404;
        error.errors = { message: "Not Spot with that id was found."};
        return next(error);
    }
});

module.exports = router