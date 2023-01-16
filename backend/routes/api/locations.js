const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Location = mongoose.model("Location");


// GET /api/locations
router.get("/", async (req, res, next) => {
  try {
    const locations = await Location.find();
    //   .populate("id", "zipcode, cityName, spot")
    //   .populate("spots", "latitude, longitude, name, comments, photos")
    return res.json(locations);
  } catch (err) {
    console.error(err);
    return res.json([]);
  }
});

// GET /api/locations/:id
router.get("/:id", async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id)
    // .populate("id", "zipcode, cityName, spot");
    //   .populate("spots", "latitude, longitude, name, comments, photos")
    return res.json(location);
  } catch (err) {
    const error = new Error("Location not found");
    error.statusCode = 404;
    error.errors = { message: "No location found with that id" };
    return next(error);
  }
});

module.exports = router;
