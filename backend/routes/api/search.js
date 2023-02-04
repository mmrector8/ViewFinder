const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Location = mongoose.model("Location");
const User = mongoose.model("User");
const Photo = mongoose.model("Photo");
const standardizeData = require("../../utils/standardizeData");



router.get('/', async (req, res, next) => {
    //expect query to come in as ?body=val
    try {
      
      //ensures body is not empty 
      if (!req.query.body) return res.json({ message: "Missing Body" });

      //query photos collection 
      let photos = await Photo.find({
        $or: [
          {
            description: {
              $regex: new RegExp(req.query.body, "i"),
            },
          }
        ],
      });

      //query users collection 
      let users = await User.find({
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

      //query locations collection 
      let locations = await Location.find({
        $or: [
          {
            county: {
              $regex: new RegExp(req.query.body, "i"),
            },
          },
        ],
      });

      //normalize the array into object and deconstruct all the objects into one object  
      if (!users.length && !locations.length && !photos.length) return res.json({ search: [] });
      return res.json({...standardizeData(users), ...standardizeData(locations), ...standardizeData(photos)});
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