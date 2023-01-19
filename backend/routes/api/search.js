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
        if (!req.query.body) return res.json({message: "Missing Body"})

        let data; 
        if (req.query.type === includedTypes[0]) {
          //queries photo based on genre, description, condition, transportation, bestTimeOfDay, and payment
          // $ "i" case insensitive 

          data = await Photo.find({
            $or: [
              {
                genre: {
                    $regex: new RegExp(req.query.body, "i"),
                },},
                { description: {
                    $regex: new RegExp(req.query.body, "i"),
                } },
                { condition: {
                    $regex: new RegExp(req.query.body, "i"),
                } },
                { transportation: {
                    $regex: new RegExp(req.query.body, "i"),
                } },
                { bestTimeOfDay: {
                    $regex: new RegExp(req.query.body, "i"),
                } }
            ],
          });
        } else if (req.query.type === includedTypes[1]) {
            //queries User model based on username and email 
            data = await User.find({
              $or: [
                {
                  username: {
                    $regex: new RegExp(req.query.body, "i"),
                  },
                },
                {
                  email: {
                    $regex: new RegExp(req.query.body, "i"),
                  },
                },
              ],
            }).select("_id username email createdAt updatedAt");
            
        } else if (req.query.type === includedTypes[2]) {
            //queries Location model based on county 
            data = await Location.find({
              $or: [
                {
                  county: {
                    $regex: new RegExp(req.query.body, "i"),
                  },
                },
              ],
            });

        }
        return res.json(standardizeData(data))
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