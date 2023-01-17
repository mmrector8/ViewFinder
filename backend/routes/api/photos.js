const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Photo = mongoose.model("Photo");
const Spot = mongoose.model("Spot");
const validatePhotoInput = require("../../validations/locations");
const { requireUser } = require("../../config/passport");

router.get("/", async (req, res, next) => {
  //route needed for the splash page
  try {
    const sortBy = "likes"; //sorting photos by likes
    const photos = await Photo.aggregate()
      .addFields({ length: { $size: `$${sortBy}` } }) //adds a new field called length within counts the size of the likes array
      .sort({ length: -1 }); //orders the aggregate/array based on ascending order

    return res.json(photos); //returns the photos in ascending order based on likes
  } catch (err) {
    const error = new Error("Photos were not found");
    error.statusCode = 404;
    error.errors = { message: "No Photos were found." };
    return next(error);
  }
});

router.post("/", requireUser, validatePhotoInput, async (req, res, next) => {
  try {
    //!MUST INCLUDE REQUIRE USER
    //find it a spot exists with the given coordinates within 1 mile

    recArea = spotSearchRectangle(req.body.latitude, req.body.longitude);
    let spot = await Spot.find({
      $and: [
        { latitude: { $gte: recArea.top1[0], $lte: recArea.bottom1[0] } },
        { longitude: { $gte: recArea.bottom1[1], $lte: recArea.top1[1] } },
      ],
    });

    // return res.json(spot);
    if (!spot.length) {
      //else 'spot does not exist'
      //create and save new spot
      // retrive new spot._id and use it as a ref for the photo
      const newSpot = new Spot({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        name: req.body.description,
      });
      spot = await newSpot.save();
      
    } else {
      spot = spot.pop();
    }

    // return res.json(spot)
    //ADD SPOT ID to newPhoto instance & likes should be an empty array nice a new post will have zero likes
    //need to convert client sent latitude and longitude into a float since it most likey by a string
    const newPhoto = new Photo({
      url: req.body.url,
      spotId: spot._id, //using the existing or new spot
      userId: req.user._id, //retrived from requireUser
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      genre: req.body.genre,
      description: req.body.description,
      condition: req.body.condition,
      transportation: req.body.transportation,
      bestTimeOfDay: req.body.bestTimeOfDay,
      payment: req.body.payment,
      likes: [],
    });
    //retrives new photo
    let photo = await newPhoto.save();
    // return res.json(spot)
    //update and save spot photo ref array
    await spot.photos.addToSet(photo._id); //adds id if it does not exist
    await spot.save();

    return res.json(photo); // returns new photo
  } catch (err) {
    const error = new Error("New Photo Upload failed");
    error.statusCode = 404;
    error.errors = { message: `Failed to create a new photo, ${err} ` };
    return next(error);
  }
});

router.delete("/:id", requireUser, async (req, res, next) => {
  try {
    let id = req.params.id;
    let photo = await Photo.findOneAndDelete({ _id: id }); //find and deletes photo based on params
    ////Updating the spot photo ref array 
        //first arg is filter: getting spot by id 
        //sec arg pulls the photo id within the photoos field 
    let spot = await Spot.updateOne({_id: photo.spotId}, {$pull: {photos: photo._id}}) 

    return res.json({ message: ` Successfully Deleted photo with id ${id} and updated Spot` });
  } catch (err) {
    const error = new Error("Delete Photo failed");
    error.statusCode = 404;
    error.errors = {
      message: "Failed to delete a photo, wrong id or photo does not exist",
    };
    return next(error);
  }
});

function spotSearchRectangle(latP, longP) {
  //used to create the possible spot cooridnates within 1 mile distance

  // 1 latitude = 69 miles & 1 longitude = 54.6 miles
  // 1.014493 lat = 70 miles & 1.282051 long = 70 miles
  const latSd = 1.014493 / 70; // lat standard deviation
  const longSd = 1.282051 / 70; //long standard deviation

  //formula to create an rectanglar search area
  //top1: [latP - latSd, longP + longSd]
  //bottom1: [latP + latSd, longP - longSd]
  return {
    top1: [latP - latSd, longP + longSd],
    bottom1: [latP + latSd, longP - longSd],
  };
}

module.exports = router;
