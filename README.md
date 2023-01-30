# [ViewFinder](https://viewfinder.onrender.com/)

## Description 

ViewFinder is a web application that allows photographers to find specific spots in California that would be a great place to take a picture perfect photo. The photographers can share photos with others by posting their photo and tagging the conditions in which they took it. It allows users to view the page of a specific photographer and like the photos that they love the most.

![homepage](https://user-images.githubusercontent.com/65653163/215369166-cea0c239-0934-4871-afcd-1a72251a64b3.gif)

![clustering](https://user-images.githubusercontent.com/65653163/215369209-0bd2b775-916c-4fb5-8204-61416848c736.gif)

## List of technologies used

ViewFinder uses a MERN stack (Mongo, Express, React, and Node). 
* Backend: Node, Express, MongoDB, Mongoose, [Google Map Server Side Service](https://github.com/googlemaps/google-maps-services-js)
* Frontend: React and Redux, [Google Maps API](https://developers.google.com/maps), [MaterialUI](https://mui.com/) for icons
* Services: AWS 

## Significant Code

### Searchbar Logic

The search feature is made possible through this simple router. The route accepts a type and body as query keys, in which the type must match the one of the type within the included types array. A second check is done to ensure that the body key value is not empty. After passing the the two checks, The if else block is hit in which it will enter a specific condition based on the type. After entering a condition, the it will utilize regex to search through the different fields of the collection. If any data matched the regex pattern, that document is pulled and added to the the query array. The queried data is then normalized using the standizeData and sent back to the client.

![Screen Shot 2023-01-29 at 5 21 08 PM](https://user-images.githubusercontent.com/65653163/215369271-3f1768bf-b903-4429-bbac-0d5229278abb.png)

```javascript
router.get('/', async (req, res, next) => {
   try {
       const includedTypes = ["photos", "users", "locations"]
       if (!includedTypes.includes(req.query.type)) throw req
       if (!req.query.body) return res.json({message: "Missing Body"})
       let data;
       if (req.query.type === includedTypes[0]) {
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

```

### Photo upload logic
When a user adds a photo, there are two main cases that can happen. They can either upload a picture to an existing or non existing spot. A photo is added to a spot if the photo’s latitude and longitude is within a one mile distance of an existing spot. The spotSearchRectangle returns an object with the keys of top and bottom points, which are utilized within the Spot find. If the spot exists, the photo is created and saved, and all the corresponding collections storing a ref for photos are updated as well before the data is sent back to the client. If the spot does not exist, then a new spot must be create. A new spot is created based on the request latitude and longitude, and the new field is filled using the request description ment for the photo. Once the spot is saved to the collection, a specific document must be updated within the location collection. In order to complete this action, a server side google map’s reverse geocode api is utilized. The request latitude and longitude are imputed into the api in which a lot of information is returned from the fetch. All the locations have a specific county name, so I utilize the countySearch function to retrieve the county name form date requested from the google map’s api. The county name is used to find the location and updates its spots field to include the newly created spot. Once creating a new spot and updating the location’s spots field is updated, a new photo is created & saved, and all the corresponding collections storing a ref for photos are updated as well. The data is sent back to the client. 
```javascript

router.post(
 "/",
 singleMulterUpload("images"),
 requireUser,
 validatePhotoInput,
 async (req, res, next) => {
   try {
     const client = new Client({});
     recArea = spotSearchRectangle(+req.body.latitude, +req.body.longitude);
     let spot = await Spot.find({
       $and: [
         { latitude: { $gte: recArea.top1[0], $lte: recArea.bottom1[0] } },
         { longitude: { $gte: recArea.bottom1[1], $lte: recArea.top1[1] } },
       ],
     });
     if (!spot.length) {
       const newSpot = new Spot({
         latitude: +req.body.latitude,
         longitude: +req.body.longitude,
         name: req.body.description,
       });
       spot = await newSpot.save();
       const mapResult = await client.reverseGeocode({
         params: {
           latlng: [+req.body.latitude, +req.body.longitude],
           key: process.env.GOOGLE_MAPS_API_KEY,
         },
         timeout: 1000,
       });
       let county = countySearch(mapResult.data.results);
       await Location.updateOne(
         { county: county },
         { $push: { spots: spot._id } }
       );
     } else {
       spot = spot.pop();
     }
     const imgUrl = await singleFileUpload({ file: req.file, public: true });
     const newPhoto = new Photo({
       url: imgUrl,
       spotId: spot._id,
       userId: req.user._id,
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
     let photo = await newPhoto.save();
     await spot.photos.addToSet(photo._id);
     await spot.save();
     await User.updateOne(
       { _id: photo.userId },
       { $push: { photos: photo._id } }
     );
     return res.json(photo);
   } catch (err) {
     const error = new Error("New Photo Upload failed");
     error.statusCode = 404;
     error.errors = { message: `Failed to create a new photo, ${err} ` };
     return next(error);
   }
 }
);

```

## Screenshots

### Modal for inspecting a photo

![Screen Shot 2023-01-29 at 5 21 55 PM](https://user-images.githubusercontent.com/65653163/215369353-2d589520-e1ea-4adb-89a2-5c0c06afa808.png)

### Spot Show Page

![Screen Shot 2023-01-29 at 5 18 17 PM](https://user-images.githubusercontent.com/65653163/215369407-78217b61-10a6-4675-92f8-c7bff1c10397.png)

### User Profile Page

![Screen Shot 2023-01-29 at 5 20 18 PM](https://user-images.githubusercontent.com/65653163/215369421-184c6023-094d-40c9-bd3d-c5808eb5d586.png)

## Technical implementation details

We had to think about the flow of the website in general, where to post photos and how a photo is nested in a spot and nested into a location. We had multiple talks about how the backend should be implemented and how it affects the frontend. 


## To-dos and future features
- Allow users to see photos they liked
- Heatmaps
- Fix likes on the users show page
- Add more seeds
- Update the photo upload feature on the form
- Add loading spinner
