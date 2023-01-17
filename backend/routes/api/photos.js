const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Photo = mongoose.model('Photo')
const Spot = mongoose.model('Spot');
const validatePhotoInput = require("../../validations/locations");
const { requireUser } = require("../../config/passport");

router.get("/", async (req, res, next) => {
    //route needed for the splash page 
    try {
        const sortBy = "likes" //sorting photos by likes 
        const photos = await Photo.aggregate()
            .addFields({"length": {"$size": `$${sortBy}`}}) //adds a new field called length within counts the size of the likes array
            .sort({"length": 1}) //orders the aggregate/array based on ascending order 
            
        return res.json(photos) //returns the photos in ascending order based on likes 
    }
    catch (err) {
        const error = new Error('Photos were not found');
        error.statusCode = 404;
        error.errors = { message: "No Photos were found." };
        return next(error);
    }
});

router.post("/", requireUser, validatePhotoInput,  async (req, res, next) => {
    try {
        //find it a spot exists with the given coordinates ~ NEED TO DECIDE on a radius 
            //radius = 
        // add +- to latitude and latitude 
        let spot = Spot.find( {latitude: req.body.latitude, longitude: req.body.latitude})
        let spotId;
        if (spot) {
            
        }
            //spotId = spot._id 

        //else 'spot does not exist'
            //create and save new spot 
            // retrive new spot._id and use it as a ref for the phot0 



        //ADD SPOT ID to newPhoto instance & likes should be an empty array nice a new post will have zero likes 
        //need to convert client sent latitude and longitude into a float since it most likey by a string 

        const newPhoto = new Photo({
            url: req.body.url,
            userId: req.user._id, //retrived from requireUser 
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            genre: req.body.genre,
            description: req.body.description,
            condition: req.body.condition,
            transportation: req.body.transportation,
            bestTimeOfDay: req.body.bestTimeOfDay,
            payment: req.body.payment,
            likes: []
        })


    }
    catch (err) {
        const error = new Error('New Photo Upload failed');
        error.statusCode = 404;
        error.errors = { message: "Failed to create a new photo" };
        return next(error);
    }
})


router.delete('/:id', requireUser, async(req, res, next) => {

    try {
        let id = req.params.id 
        let photo = await Photo.findOneAndDelete(id)
        return res.json({ message: ` Successfully Deleted photo with id ${id}` });
    }
    catch (err) {
        const error = new Error('Delete Photo failed');
        error.statusCode = 404;
        error.errors = { message: "Failed to delete a photo, wrong id or photo does not exist" };
        return next(error);
    }
})



module.exports = router