const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Location = mongoose.model("Location");
const standardizeData = require("../../utils/standardizeData")


// GET /api/locations
router.get("/", async (req, res, next) => {
  try {
    const locations = await Location.find(); //no pouplation needed

    //return standardized data: {location._id: location,...}
    return res.json(standardizeData(locations));
  } catch (err) {
    const error = new Error("Locations not found");
    error.statusCode = 404;
    error.errors = { message: `No Locations were found. ${err}` };
    return next(error);
  }
});

// GET /api/locations/:id
router.get("/:id", async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id).populate({
      path: "spots",
      select: "_id latitude longitude name",
      populate: {
        path: "photos",
        select: "_id url latitude longitude userId likes description",
        populate: { path: "userId", select: "_id username email" },
      },
    })
    .populate({
      path: "spots",
      select: "_id latitude longitude name",
      populate: {
        path: "photos",
        select: "_id url latitude longitude userId likes description",
        populate: { path: "spotId", select: "name" },
      },
    })
                       
                       
    location.spots.forEach((spot) => {
      spot.photos.sort((a, b) => b.likes.length - a.likes.length);
    })
    // let spotsObj = standardizeData(location.spots)
    // location.spots = {...spotsObj}; 
    return res.json(location);
  } catch (err) {
    const error = new Error("Location not found");
    error.statusCode = 404;
    error.errors = { message: `No Location was found. ${err}` };
    return next(error);
  }
});

module.exports = router;
