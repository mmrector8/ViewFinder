const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Spot = mongoose.model("Spot");
const Location = mongoose.model("Location");
const standardizeData = require("../../utils/standardizeData");

router.get("/", async (req, res, next) => {
  /*  This is router is for testing*/

  try {
    // const location = await Location.findById(req.params.locationId)
    //                     // .populate({path: "spots", populate: {
    //                     //     path: "photos"}})
    //                     // .populate({path: "spots", populate: {
    //                     //     path: "comments"}})

    // spots = location.spots //.populate("spots.photos");
    const spots = await Spot.find();
    return res.json(spots);
  } catch (err) {
    const error = new Error("Spot not found");
    error.statusCode = 404;
    error.errors = { message: `No Spots were found. ${err}` };
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const spot = await Spot.findById(req.params.id)
      .populate("photos", "") //_id latitude
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select: "_id _id username",
        },
      })
      .populate({
        path: "photos",
        populate: { path: "userId", select: "username" },
      })
      .populate({
        path: "photos",
        populate: { path: "spotId", select: "name" },
      });
    return res.json(spot);
  } catch (err) {
    const error = new Error("Spot not found");
    error.statusCode = 404;
    error.errors = { message: `Not Spot with that id was found ${err}` };
    return next(error);
  }
});

router.get("/locations/:locationId", async (req, res, next) => {
  try {
    let location = await Location.findOne({
      _id: req.params.locationId,
    })
      .populate({
        path: "spots",
        populate: {
          path: "photos",
          select: "_id description url",
          populate: { path: "userId", select: "_id username" },
        },
      })
      .populate({
        path: "spots",
        populate: {
          path: "photos",
          select: "_id description url",
          populate: { path: "likes", select: "_id likerId" },
        },
      });
    return res.json(standardizeData(location.spots));
  } catch (err) {
    const error = new Error("Location not found");
    error.statusCode = 404;
    error.errors = { message: `Not Location with that id was found ${err}` };
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let newSpot = new Spot({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      name: req.body.name,
    });
    const spot = await newSpot.save();
    //may need
    return res.json(spot);
  } catch {
    const error = new Error("Spot not found");
    error.statusCode = 404;
    error.errors = { message: "Not Spot with that id was found." };
    return next(error);
  }
});

module.exports = router;
