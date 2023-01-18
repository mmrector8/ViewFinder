const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Location = mongoose.model("Location");
const User = mongoose.model("User");
const Photo = mongoose.model("Photo");
const standardizeData = require("../../utils/standardizeData");



router.get('/', async (req, res, next) => {
    //expect query to come in as ?type=val&body=val
    try {
        const includedTypes = ["photos", "users", "locations"]
        if (!includedTypes.includes(req.query.type)) throw req
        let data; 
        if (req.query.type === includedTypes[0]) {
            data = await Photo.find({
                $or: [
                    {genre: {$regex: req.query.body}}
                ]
            })
        } else if (req.query.type === includedTypes[1]) {

        } else if (req.query.type === includedTypes[2]) {

        }
        return req.json(data)
    }
    catch(err) {
        const error = new Error("Search failed");
        error.statusCode = 404;
        error.errors = {
          message: `Failed to find a photo, a location, or/and user; ${err}`,
        };
        return next(error);
    }
});






module.exports = router;