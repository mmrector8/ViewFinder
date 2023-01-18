const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Spot = mongoose.model('Spot')
const Location = mongoose.model('Location')

router.get("/", async(req, res, next) => {
    /*  This is router is for testing*/

    try {
        // const location = await Location.findById(req.params.locationId)
        //                     // .populate({path: "spots", populate: {
        //                     //     path: "photos"}})
        //                     // .populate({path: "spots", populate: {
        //                     //     path: "comments"}})
                            
        // spots = location.spots //.populate("spots.photos");
        const spots = await Spot.find()
        return res.json(spots)
    }
    catch(err) {
        const error = new Error('Spot not found');
        error.statusCode = 404;
        error.errors = { message: `No Spots were found. ${err}` };
        return next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    
    try {
      const spot = await Spot.findById(req.params.id)
                            .populate("photos", "") //_id latitude
                            .populate("comments");
                       
      return res.json(spot);
    }
    catch(err) {
        const error = new Error('Spot not found');
        error.statusCode = 404;
        error.errors = { message: `Not Spot with that id was found ${err}`};
        return next(error);
    }
});

router.post("/", async (req, res, next) => {

    try {
        let newSpot = new Spot({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name 
        })
        const spot = await newSpot.save()
        //may need 
        return res.json(spot)
    }
    catch {
        const error = new Error('Spot not found');
        error.statusCode = 404;
        error.errors = { message: "Not Spot with that id was found." };
        return next(error);
    }
});

module.exports = router