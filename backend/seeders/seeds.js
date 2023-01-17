const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Spot = require("../models/Spot")
const Location = require("../models/Location")
const Photo = require("../models/Photo")
const Comment = require("../models/Comment")
const Like = require("../models/Like")
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const NUM_SEED_USERS = 10;


const users = [];

users.push(
  new User({
    username: "demo-user",
    email: "demo-user@gmail.com",
    hashedPassword: bcrypt.hashSync("starwars", 10),
  })
);

users.push(
  new User({
    username: "Kaushal",
    email: "k@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
  })
)

users.push(
  new User({
    username: "Nishant",
    email: "nishant@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
  })
)
users.push(
  new User({
    username: "Christine",
    email: "gymrat@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
  })
)

users.push(
  new User({
    username: "Morgan",
    email: "morgan@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    })
  );
}

const locations = []
//Location 
const counties = [
  "Alameda County",
  "Alpine County",
  "Amador County",
  "Butte County",
  "Calaveras County",
  "Colusa County",
  "Contra Costa County",
  "Del Norte County",
  "El Dorado County",
  "Fresno County",
  "Glenn County",
  "Humboldt County",
  "Imperial County",
  "Inyo County",
  "Kern County",
  "Kings County",
  "Lake County",
  "Lassen County",
  "Los Angeles County",
  "Madera County",
  "Marin County",
  "Mariposa County",
  "Mendocino County",
  "Merced County",
  "Modoc County",
  "Mono County",
  "Monterey County",
  "Napa County",
  "Nevada County",
  "Orange County",
  "Placer County",
  "Plumas County",
  "Riverside County",
  "Sacramento County",
  "San Benito County",
  "San Bernardino County",
  "San Diego County",
  "San Francisco County",
  "San Joaquin County",
  "San Luis Obispo County",
  "San Mateo County",
  "Santa Barbara County",
  "Santa Clara County",
  "Santa Cruz County",
  "Shasta County",
  "Sierra County",
  "Siskiyou County",
  "Solano County",
  "Sonoma County",
  "Stanislaus County",
  "Sutter County",
  "Tehama County",
  "Trinity County",
  "Tulare County",
  "Tuolumne County",
  "Ventura County",
  "Yolo County",
  "Yuba County"];

  for(let i=0; i < counties.length; i++){
    locations.push(
      new Location({
        county: counties[i],
        spots: []
      })
    )
  }

//Spots 

const spots = [];

const tunnelPoint = new Spot({
  latitude: 37.7158029,
  longitude: -119.6796714,
  name: "Tunnel View",
  comments: [],
  photos: []
})

const coitTower = new Spot({
  latitude: 37.80261528581187,
  longitude: -122.40573637127333,
  name: "Coit Tower",
  comments: [],
  photos: []
})

const halfDome = new Spot({
  latitude: 37.74656313062079,
  longitude: -119.53332797711494,
  name: "Half Dome",
  comments: [],
  photos: []
})

const badWaterBasin = new Spot({
  latitude: 36.2341897,
  longitude: - 116.8863298,
  name: "Badwater Basin",
  comments: [],
  photos: []
})
spots.push(tunnelPoint, coitTower, halfDome, badWaterBasin)

locations[21].spots.push(tunnelPoint)

//comments
const comments = []

for (let i = 0; i < 10; i++) {
  const body = faker.lorem.sentence()
  const userId = users[i]._id
  const spotId = spots[i % 4]._id
  comments.push(
    new Comment({
      body,
      userId,
      spotId
    })
  )
}



//photos
const photos = [];
// let likes = [];
for (let i = 0; i < 10; i++) {
  const randomIdx = Math.floor(Math.random() * users.length) // from 0 to 10 exculsive; used for user and spot id
  const url = faker.word.noun();
  const userId = users[randomIdx]._id;
  const spotId = spots[i % 4]._id;
  const latitude = spots[i%4].latitude;
  const longitude = spots[i%4].longitude;
  const genre = 'wildlife';
  const condition = ['rockey', 'slope'];
  const transportation = ['car', 'hike'];
  const bestTimeOfDay = 'Golden Hour'
  const payment = "$";
  // likes.push(i);

  photos.push(
    new Photo({
      url,
      spotId,
      userId,
      latitude,
      longitude,
      genre,
      condition,
      transportation,
      bestTimeOfDay,
      payment,
      likes: []
    })
  )
}

//likes
const likes = []

for(let i =0; i < 10; i++){
  let newLike = new Like({ photoId: photos[i], likerId: users[i]})
  likes.push(newLike);
  photos[i].likes.push(newLike)
}


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    insertSeeds();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
  console.log("Resetting db and seeding users and spots...");
  User.collection
    .drop()
    .then(() => Location.collection?.drop())
    .then(() => Spot.collection?.drop())
    .then(() => Comment.collection?.drop())
    .then(() => Photo.collection?.drop())
    .then(() => Like.collection?.drop())
    .then(() => User.insertMany(users))
    .then(()=> Location.insertMany(locations))
    .then(() => Spot.insertMany(spots))
    .then(()=> Comment.insertMany(comments))
    .then(() => Photo.insertMany(photos))
    .then(() => Like.insertMany(likes))
    .then(() => {
      console.log("done!");
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });

};
