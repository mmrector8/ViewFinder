const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Location = mongoose.model("Location");
const Photo = mongoose.model("Photo");
const Spot = mongoose.model("Spot");
const User = mongoose.model("User");
const validatePhotoInput = require("../../validations/photos");
const { requireUser } = require("../../config/passport");
const { Client } = require("@googlemaps/google-maps-services-js");
const standardizeData = require("../../utils/standardizeData");
const { singleMulterUpload, singleFileUpload } = require("../../awsS3");

router.get("/", async (req, res, next) => {
  //route needed for the splash page
  try {
    const sortBy = "likes"; //sorting photos by likes
    const photos = await Photo.aggregate()
      .addFields({ length: { $size: `$${sortBy}` } }) //adds a new field called length within counts the size of the likes array
      .sort({ length: -1 }) //orders the aggregate/array based on ascending order
      .limit(5);
    //populates the userId
    await Photo.populate(photos, {
      path: "userId",
      select: "_id username email",
    });

    //returns the standardized date in ascending order based on likes
    return res.json(standardizeData(photos));
  } catch (err) {
    const error = new Error("Photos were not found");
    error.statusCode = 404;
    error.errors = { message: "No Photos were found." };
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id)
      .populate("likes", "likerId")
      .populate("userId", "username")
      .populate("spotId", "name");

    return res.json(photo);
  } catch (err) {
    const error = new Error("Photo was not found");
    error.statusCode = 404;
    error.errors = { message: `No Photo was found. ${err}` };
    return next(error);
  }
});

router.post(
  "/",
  singleMulterUpload("images"),
  requireUser,
  validatePhotoInput,
  async (req, res, next) => {
    //requireUser
    //!MUST INCLUDE REQUIRE USER
    try {
      //find it a spot exists with the given coordinates within 1 mile
      const client = new Client({});

      recArea = spotSearchRectangle(+req.body.latitude, +req.body.longitude); // retrives top and bottom coordinates within a 1 mile radius
      let spot = await Spot.find({
        $and: [
          { latitude: { $gte: recArea.top1[0], $lte: recArea.bottom1[0] } },
          { longitude: { $gte: recArea.bottom1[1], $lte: recArea.top1[1] } },
        ],
      });

      if (!spot.length) {
        //spot does not exist
        //create and save new spot
        const newSpot = new Spot({
          latitude: +req.body.latitude,
          longitude: +req.body.longitude,
          name: req.body.description,
        });
        //new spot used for spotId
        spot = await newSpot.save();

        //Finding and updating a location's spot field based on spot's lat and long
        //pulg coordinates into an api
        const mapResult = await client.reverseGeocode({
          params: {
            latlng: [+req.body.latitude, +req.body.longitude],
            key: process.env.GOOGLE_MAPS_API_KEY,
          },
          timeout: 1000, // milliseconds
        });
        // use the county name retrived from api to find the location
        let county = countySearch(mapResult.data.results); //retrives county from api call
        //find the location based on countyName & push spot._id
        await Location.updateOne(
          { county: county },
          { $push: { spots: spot._id } }
        );
      } else {
        //found spot comes in an array with a single object
        spot = spot.pop();
      }

      // return res.json(spot);
      //ADD SPOT ID to newPhoto instance & likes should be an empty array nice a new post will have zero likes
      //need to convert client sent latitude and longitude into a float since it most likey by a string
      const imgUrl = await singleFileUpload({ file: req.file, public: true }); //retrive uploaded photo
      // return res.json(imgUrl);
      const newPhoto = new Photo({
        url: imgUrl,
        spotId: spot._id, //using the existing or new spot
        userId: req.user._id, //retrived from requireUser
        latitude: +req.body.latitude,
        longitude: +req.body.longitude,
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
      //update and save spot photo ref array
      await spot.photos.addToSet(photo._id); //adds id if it does not exist
      await spot.save();

      //update user's photo list
      await User.updateOne(
        { _id: photo.userId },
        { $push: { photos: photo._id } }
      );

      return res.json(photo); // returns new photo
    } catch (err) {
      const error = new Error("New Photo Upload failed");
      error.statusCode = 404;
      error.errors = { message: `Failed to create a new photo, ${err} ` };
      return next(error);
    }
  }
);

router.delete("/:id", requireUser, async (req, res, next) => {
  try {
    let id = req.params.id;
    let photo = await Photo.findOneAndDelete({ _id: id }); //find and deletes photo based on params
    ////Updating the spot and user photo ref array
    //first arg is filter: getting spot by id
    //sec arg pulls the photo id within the photoos field
    await Spot.updateOne(
      { _id: photo.spotId },
      { $pull: { photos: photo._id } }
    );
    await User.updateOne(
      { _id: photo.userId },
      { $pull: { photos: photo._id } }
    );
    return res.json({
      message: ` Successfully Deleted photo with id ${id} and updated Spot`,
    });
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

function countySearch(result) {
  // retrives data.result array
  for (let resultObj of result) {
    //loops through the objects
    for (let addressCompEle of resultObj.address_components) {
      //keys into address_components and loops through its objects
      if (
        addressCompEle.types.includes("administrative_area_level_2") &&
        addressCompEle.types.includes("political")
      ) {
        // checks if the object inculdes those two key phrases within types
        //returns keys into long_name which has county name
        return addressCompEle.long_name;
      }
    }
  }
  //return falsey if county not found
  return "";
}

module.exports = router;
