const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Spot = require("../models/Spot");
const Location = require("../models/Location");
const Photo = require("../models/Photo");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
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
);

users.push(
  new User({
    username: "Nishant",
    email: "nishant@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
  })
);
users.push(
  new User({
    username: "Christine",
    email: "gymrat@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
  })
);

users.push(
  new User({
    username: "Morgan",
    email: "morgan@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
  })
);

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

const locations = [];
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
  "Yuba County",
];

const latitudes = [
  37.624315, 38.613674, 38.486828, 39.637016, 38.238598, 39.182779, 37.90988,
  41.714158, 38.775282, 36.74774, 39.603106, 40.740516, 33.103212, 36.589789,
  35.36454, 36.056331, 39.128971, 40.609659, 34.029764, 37.102897, 38.021327,
  37.595354, 39.366423, 37.207431, 41.585104, 37.945361, 36.247046, 38.549569,
  39.280588, 33.715923, 39.085128, 40.013726, 33.71584, 38.551275, 36.66212,
  34.830411, 32.801231, 37.764736, 37.928696, 35.314401, 37.452894, 34.719568,
  37.285887, 37.047125, 40.800481, 39.574404, 41.667987, 38.271116, 38.578088,
  37.573452, 39.118422, 40.115653, 40.828629, 36.208475, 38.045595, 34.530341,
  38.748937, 39.22226,
];
const longitudes = [
  -121.841977, -119.799624, -120.493573, -121.552874, -120.516094, -122.207934,
  -121.88203, -123.921753, -120.509466, -119.601986, -122.39203, -123.889214,
  -115.33143, -117.401066, -118.647875, -119.810978, -122.762329, -120.716295,
  -118.216364, -119.907694, -122.850889, -119.832879, -123.418197, -120.721893,
  -120.690981, -118.857524, -121.318399, -122.327948, -121.023593, -117.752973,
  -120.815019, -120.820736, -115.941136, -121.561622, -121.120444, -116.258677,
  -117.087879, -122.445499, -121.269468, -120.587333, -122.322506, -120.112898,
  -121.809913, -122.078635, -121.986137, -120.466462, -122.599523, -121.983767,
  -122.990468, -121.005717, -121.746597, -122.259543, -122.944035, -118.837918,
  -119.89776, -119.085093, -121.928698, -121.394457,
];

for (let i = 0; i < counties.length; i++) {
  locations.push(
    new Location({
      county: counties[i],
      spots: [],
      latitude: latitudes[i],
      longitude: longitudes[i],
    })
  );
}

//Spots

const spots = [];

const tunnelPoint = new Spot({
  latitude: 37.7158029,
  longitude: -119.6796714,
  name: "Tunnel View",
  comments: [],
  photos: [],
});

const coitTower = new Spot({
  latitude: 37.80261528581187,
  longitude: -122.40573637127333,
  name: "Coit Tower",
  comments: [],
  photos: [],
});

const halfDome = new Spot({
  latitude: 37.74656313062079,
  longitude: -119.53332797711494,
  name: "Half Dome",
  comments: [],
  photos: [],
});

const badWaterBasin = new Spot({
  latitude: 36.2341897,
  longitude: -116.8863298,
  name: "Badwater Basin",
  comments: [],
  photos: [],
});
spots.push(tunnelPoint, coitTower, halfDome, badWaterBasin);

locations[21].spots.push(tunnelPoint);
locations[13].spots.push(badWaterBasin);

//comments
const comments = [];

for (let i = 0; i < 10; i++) {
  const body = faker.lorem.sentence();
  const userId = users[i]._id;
  const spotId = spots[i % 4]._id;
  comments.push(
    new Comment({
      body,
      userId,
      spotId,
    })
  );
  spots[i % 4].comments.push(comments[i]);
}

//photos

const photos = [];

const conditions = 
  [
    "rocky",
    "slippery",
    "slope",
    "snowy",
    "windy",
    "rainy",
    "wildlife",
    "heat",
    "shade",
  ];

const transportations = [
  "walk",
  "hike",
  "car",
  "backpacking",
  "bike",
  "airplane",
  "public",
];

const genres = [
  "wildlife",
  "street",
  "landscape",
  "portrait",
  "astro",
  "aerial",
];
const bestTimeOfDays = ["first light", "sunrise", "afternoon", "sunset", "golden hour", "night"];

const payments = ["0", "$", "$$", "$$$"];

for (let i = 0; i < 10; i++) {
  const randomIdx = Math.floor(Math.random() * users.length) // from 0 to 10 exculsive; used for user and spot id
  const url = faker.word.noun();
  const userId = users[randomIdx]._id;
  const spotId = spots[i % 4]._id;
  const latitude = spots[i % 4].latitude;
  const longitude = spots[i % 4 ].longitude;
  const genre = genres[i % 6];
  const condition = [conditions[i % 9], conditions[i % 4], conditions[i % 2]];
  const transportation = [transportations[i % 7], transportations[i % 3]];
  const bestTimeOfDay = bestTimeOfDays[i % 6];
  const payment = payments[i % 4];
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
      likes: [],
    })
  );
  users[i % 5].photos.push(photos[i]);
  spots[i % 4].photos.push(photos[i]);
}

//likes
const likes = [];

for (let i = 0; i < 31; i++) {
  let newLike = new Like({ photoId: photos[i % 10], likerId: users[i % 5] });
  likes.push(newLike);
  photos[i % 10].likes.push(newLike);
}
//extra like
let extraLike = new Like({
  photoId: badWaterBasin.photos[0]._id,
  likerId: users[2],
});
likes.push(extraLike);
badWaterBasin.photos[0].likes.push(extraLike);

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
    .then(() => Location.insertMany(locations))
    .then(() => Spot.insertMany(spots))
    .then(() => Comment.insertMany(comments))
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
