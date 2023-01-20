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

const spot1 = new Spot({
  latitude: 37.827419,
  longitude: -122.481477,
  name: "Golden Gate Bridge",
  comments: [],
  photos: [],
});
const spot2 = new Spot({
  latitude: 37.79503,
  longitude: -122.403191,
  name: "Sf Peace",
  comments: [],
  photos: [],
});
const spot3 = new Spot({
  latitude: 37.7204308944536,
  longitude: -119.646988202019,
  name: "Yosemite",
  comments: [],
  photos: [],
});
const spot4 = new Spot({
  latitude: 34.016925,
  longitude: -118.492198,
  name: "Santa Monica beauty",
  comments: [],
  photos: [],
});
const spot5 = new Spot({
  latitude: 34.055551,
  longitude: -118.24951,
  name: "Disney Opera House",
  comments: [],
  photos: [],
});
const spot6 = new Spot({
  latitude: 37.115196,
  longitude: -122.329892,
  name: "Cute Lion Seal",
  comments: [],
  photos: [],
});
const spot7 = new Spot({
  latitude: 33.980906,
  longitude: -116.241798,
  name: "Joshua Tree in River Side",
  comments: [],
  photos: [],
});
const spot8 = new Spot({
  latitude: 33.534053,
  longitude: -117.773975,
  name: "Laguna Beach",
  comments: [],
  photos: [],
});
const spot9 = new Spot({
  latitude: 36.963911,
  longitude: -122.019289,
  name: "Santa Cruz Boardwalk",
  comments: [],
  photos: [],
});
const spot10 = new Spot({
  latitude: 35.615724,
  longitude: -117.368011,
  name: "Trona",
  comments: [],
  photos: [],
});
const spot11 = new Spot({
  latitude: 33.9032721761685,
  longitude: -115.910280800483,
  name: "Joshua tree",
  comments: [],
  photos: [],
});
const spot12 = new Spot({
  latitude: 41.086205,
  longitude: -122.275215,
  name: "Shasta",
  comments: [],
  photos: [],
});
const spot13 = new Spot({
  latitude: 37.348077,
  longitude: -121.893392,
  name: "San Jose Blossom",
  comments: [],
  photos: [],
});
const spot14 = new Spot({
  latitude: 38.324028,
  longitude: -119.632601,
  name: "Sonora Pass",
  comments: [],
  photos: [],
});
const spot15 = new Spot({
  latitude: 38.301839429763,
  longitude: -122.300260526699,
  name: "Wine Country",
  comments: [],
  photos: [],
});
const spot16 = new Spot({
  latitude: 32.8853829048403,
  longitude: -117.12275083609,
  name: "Sunny SD",
  comments: [],
  photos: [],
});

spots.push(tunnelPoint, coitTower, halfDome, badWaterBasin);
spots.push(spot1 , spot2 , spot3 , spot4 , spot5 , spot6 , spot7 , spot8 , spot9 , spot10 , spot11 , spot12 , spot13 , spot14 , spot15 , spot16)

locations[21].spots.push(tunnelPoint);
locations[21].spots.push(halfDome);
locations[13].spots.push(badWaterBasin);
locations[37].spots.push(spot1);
locations[37].spots.push(spot2);
locations[21].spots.push(spot3);
locations[18].spots.push(spot4);
locations[18].spots.push(spot5);
locations[40].spots.push(spot6);
locations[32].spots.push(spot7);
locations[29].spots.push(spot8);
locations[43].spots.push(spot9);
locations[35].spots.push(spot10);
locations[35].spots.push(spot11);
locations[52].spots.push(spot12);
locations[42].spots.push(spot13);
locations[25].spots.push(spot14);
locations[27].spots.push(spot15);
locations[36].spots.push(spot16);
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
// const bestTimeOfDays = ["first light", "sunrise", "afternoon", "sunset", "golden hour", "night"];

// const payments = ["0", "$", "$$", "$$$"];

// for (let i = 0; i < 10; i++) {
//   const randomIdx = Math.floor(Math.random() * users.length); // from 0 to 10 exculsive; used for user and spot id
//   const url = faker.word.noun();
//   const userId = users[randomIdx]._id;
//   const spotId = spots[i % 4]._id;
//   const latitude = spots[i % 4].latitude;
//   const longitude = spots[i % 4 ].longitude;
//   const genre = genres[i % 6];
//   const condition = [conditions[i % 9], conditions[i % 4], conditions[i % 2]];
//   const transportation = [transportations[i % 7], transportations[i % 3]];
//   const bestTimeOfDay = bestTimeOfDays[i % 6];
//   const payment = payments[i % 4];
//   photos.push(
//     new Photo({
//       url,
//       spotId,
//       userId,
//       latitude,
//       longitude,
//       genre,
//       condition,
//       transportation,
//       bestTimeOfDay,
//       payment,
//       likes: [],
//     })
//   );
//   users[i % 5].photos.push(photos[i]);
//   spots[i % 4].photos.push(photos[i]);
// }

// let photo1 = new Photo({
//   url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/Yosemite/yosemite1.jpg",
//   spotId: spot1._id,
//   userId: users[0]._id,
//   latitude: 37.72043089,
//   longitude: -119.6469882,
//   genre: "landscape",
//   condition: ["slippery, rocky"],
//   transportation: ["hike, walk"],
//   bestTimeOfDay: "morning",
//   payment: "$",
//   likes: [],
// });
// photos.push(photo1);
// spots[2].photos.push(photo1);
// users[0].photos.push(photo1);

let photo2 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/Yosemite/yosemite1.jpg",
  spotId: spot3._id,
  userId: users[0]._id,
  latitude: 37.7204308944536,
  longitude: -119.646988202019,
  genre: "landscape",
  description: "Yosemite down by the river",
  condition: ["slippery, rocky"],
  transportation: ["hike, walk"],
  bestTimeOfDay: "morning",
  payment: "$",
  likes: [],
});
let photo3 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/Yosemite/yosemite2.jpg",
  spotId: spot3._id,
  userId: users[0]._id,
  latitude: 37.7342494301547,
  longitude: -119.637670179482,
  genre: "landscape",
  description: "El Capitan looking beautiful",
  condition: ["rocky"],
  transportation: ["hike, walk"],
  bestTimeOfDay: "night",
  payment: "$$",
  likes: [],
});
let photo4 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/Yosemite/yosemite3.jpg",
  spotId: spot3._id,
  userId: users[1]._id,
  latitude: 37.7474105119472,
  longitude: -119.533199345531,
  genre: "wildlife",
  description: "A beautiful deer frolicing in yosemite",
  condition: ["wildlife", "windy"],
  transportation: ["backpacking", "hike"],
  bestTimeOfDay: "afternoon",
  payment: "$$",
  likes: [],
});
let photo5 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/Yosemite/yosemite4.jpg",
  spotId: spot3._id,
  userId: users[1]._id,
  latitude: 37.7204308944536,
  longitude: -119.646988202019,
  genre: "landscape",
  description: "The wide open road going to Yosemite",
  condition: ["slope", "windy"],
  transportation: ["car", "public"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo6 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/Yosemite/yosemite5.jpg",
  spotId: spot3._id,
  userId: users[0]._id,
  latitude: 37.7474105119472,
  longitude: -119.533199345531,
  genre: "landscape",
  description: "At the top of half dome",
  condition: ["slope", "heat"],
  transportation: ["backpacking", "hike"],
  bestTimeOfDay: "golden hour",
  payment: "$$",
  likes: [],
});
let photo7 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/Yosemite/yosemite6.jpg",
  spotId: spot3._id,
  userId: users[0]._id,
  latitude: 37.7342494301547,
  longitude: -119.637670179482,
  genre: "landscape",
  description: "The sun peaking in saying hi",
  condition: ["shade"],
  transportation: ["car", "hike"],
  bestTimeOfDay: "first light",
  payment: "0",
  likes: [],
});
let photo8 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/drive-download-20230119T201742Z-001/santa-monica.jpg",
  spotId: spot4._id,
  userId: users[0]._id,
  latitude: 34.016925,
  longitude: -118.492198,
  genre: "landscape",
  description: "Beautiful Day In Santa Monica",
  condition: ["heat"],
  transportation: ["car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo9 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/drive-download-20230119T201742Z-001/michael-herren-0NCAaIAOMfc-unsplash.jpg",
  spotId: spot6._id,
  userId: users[1]._id,
  latitude: 37.115196,
  longitude: -122.329892,
  genre: "wildlife",
  description: "*Bark* *Bark*",
  condition: ["heat", "shade"],
  transportation: ["public", "walk"],
  bestTimeOfDay: "afternoon",
  payment: "$",
  likes: [],
});
let photo10 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/drive-download-20230119T201742Z-001/snowy-joshua-tree.jpg",
  spotId: spot7._id,
  userId: users[0]._id,
  latitude: 33.980906,
  longitude: -116.241798,
  genre: "landscape",
  description: "Them Joshin Trees",
  condition: ["snowy", "rocky"],
  transportation: ["car", "hike"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo11 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/drive-download-20230119T201742Z-001/walt-disney-concert-hall.jpg",
  spotId: spot5._id,
  userId: users[0]._id,
  latitude: 34.055551,
  longitude: -118.24951,
  genre: "street",
  description: "Disney does is again",
  condition: ["heat"],
  transportation: ["car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo12 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/drive-download-20230119T201742Z-001/laguna-beach.jpg",
  spotId: spot8._id,
  userId: users[0]._id,
  latitude: 33.534053,
  longitude: -117.773975,
  genre: "landscape",
  description: "Laguna Laguna",
  condition: ["rocky, slippery"],
  transportation: ["car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo13 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/drive-download-20230119T201742Z-001/laguna-beach.jpg",
  spotId: spot2._id,
  userId: users[2]._id,
  latitude: 37.79503,
  longitude: -122.403191,
  genre: "street",
  description: "Peace",
  condition: ["heat"],
  transportation: ["public", "bike"],
  bestTimeOfDay: "afternoon",
  payment: "$",
  likes: [],
});
let photo14 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/drive-download-20230119T201742Z-001/santa-cruz-boardwalk.jpg",
  spotId: spot9._id,
  userId: users[2]._id,
  latitude: 36.963911,
  longitude: -122.019289,
  genre: "street",
  description: "Cruising thru the board walk",
  condition: ["heat"],
  transportation: ["car", "walk"],
  bestTimeOfDay: "afternoon",
  payment: "$$",
  likes: [],
});
let photo15 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/drive-download-20230119T201742Z-001/trona-astro.jpg",
  spotId: spot10._id,
  userId: users[0]._id,
  latitude: 35.615724,
  longitude: -117.368011,
  genre: "astro",
  description: "Trona Pinnacle",
  condition: ["windy"],
  transportation: ["car"],
  bestTimeOfDay: "night",
  payment: "$",
  likes: [],
});
let photo16 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/drive-download-20230119T201742Z-001/shasta-trinity-aerial.jpg",
  spotId: spot12._id,
  userId: users[0]._id,
  latitude: 41.086205,
  longitude: -122.275215,
  genre: "aerial",
  description: "Shasta Trinity",
  condition: ["windy", "slope"],
  transportation: ["car"],
  bestTimeOfDay: "afternoon",
  payment: "$",
  likes: [],
});
let photo17 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/drive-download-20230119T201742Z-001/downtown-sj-1.jpg",
  spotId: spot13._id,
  userId: users[3]._id,
  latitude: 37.348077,
  longitude: -121.893392,
  genre: "landscape",
  description: "Boba and Vibez",
  condition: ["windy"],
  transportation: ["public"],
  bestTimeOfDay: "afternoon",
  payment: "$",
  likes: [],
});
let photo18 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/drive-download-20230119T201742Z-001/sonora-pass.jpg",
  spotId: spot14._id,
  userId: users[3]._id,
  latitude: 38.324028,
  longitude: -119.632601,
  genre: "landscape",
  description: "Sonora Pass",
  condition: ["heat"],
  transportation: ["car"],
  bestTimeOfDay: "afternoon",
  payment: "$",
  likes: [],
});
let photo19 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/joshuatree.jpg",
  spotId: spot11._id,
  userId: users[2]._id,
  latitude: 33.9032721761685,
  longitude: -115.910280800483,
  genre: "landscape",
  description: "Cute lil tree",
  condition: ["heat", "shade"],
  transportation: ["backpacking", "hike", "car"],
  bestTimeOfDay: "afternoon",
  payment: "$$$",
  likes: [],
});
let photo20 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/joshuatreeastro1.jpg",
  spotId: spot11._id,
  userId: users[3]._id,
  latitude: 33.9032721761685,
  longitude: -115.910280800483,
  genre: "astro",
  description: "Red tent in the night sky",
  condition: ["windy", "rocky"],
  transportation: ["car", "backpacking"],
  bestTimeOfDay: "night",
  payment: "$$",
  likes: [],
});
let photo21 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/joshuaastro2.jpg",
  spotId: spot11._id,
  userId: users[2]._id,
  latitude: 33.9032721761685,
  longitude: -115.910280800483,
  genre: "astro",
  description: "Sparkly stars in the night",
  condition: ["heat"],
  transportation: ["backpacking"],
  bestTimeOfDay: "night",
  payment: "$",
  likes: [],
});
let photo22 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/joshua+astro.jpg",
  spotId: spot11._id,
  userId: users[0]._id,
  latitude: 33.9032721761685,
  longitude: -115.910280800483,
  genre: "astro",
  description: "Purpley blue sky",
  condition: ["rocky"],
  transportation: ["backpacking"],
  bestTimeOfDay: "night",
  payment: "$",
  likes: [],
});
let photo23 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/napa.jpg",
  spotId: spot15._id,
  userId: users[0]._id,
  latitude: 38.301839429763,
  longitude: -122.300260526699,
  genre: "landscape",
  description: "Big juicy grapes",
  condition: ["heat"],
  transportation: ["car"],
  bestTimeOfDay: "afternoon",
  payment: "$$$",
  likes: [],
});
let photo24 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/napa2.jpg",
  spotId: spot15._id,
  userId: users[0]._id,
  latitude: 38.301839429763,
  longitude: -122.300260526699,
  genre: "landscape",
  description: "Growing Grapes",
  condition: ["windy"],
  transportation: ["car"],
  bestTimeOfDay: "golden hour",
  payment: "$$$",
  likes: [],
});
let photo25 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/sandiegocity.jpg",
  spotId: spot16._id,
  userId: users[0]._id,
  latitude: 32.8853829048403,
  longitude: -117.12275083609,
  genre: "landscape",
  description: "Beautiful San Diego",
  condition: ["windy"],
  transportation: ["airplane"],
  bestTimeOfDay: "sunrise",
  payment: "$$$",
  likes: [],
});
let photo26 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/sandiego1.jpg",
  spotId: spot16._id,
  userId: users[0]._id,
  latitude: 32.8853829048403,
  longitude: -117.12275083609,
  genre: "landscape",
  description: "The pacific ocean",
  condition: ["windy"],
  transportation: ["walk", "car"],
  bestTimeOfDay: "golden hour",
  payment: "0",
  likes: [],
});
let photo27 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/sandiegopalms.jpg",
  spotId: spot16._id,
  userId: users[0]._id,
  latitude: 32.8853829048403,
  longitude: -117.12275083609,
  genre: "landscape",
  description: "Loving the palm trees",
  condition: ["heat"],
  transportation: ["walk"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});

photos.push(
  photo2,
  photo3,
  photo4,
  photo5,
  photo6,
  photo7,
  photo8,
  photo9,
  photo10,
  photo11,
  photo12,
  photo13,
  photo14,
  photo15,
  photo16,
  photo17,
  photo18,
  photo19,
  photo20,
  photo21,
  photo22,
  photo23,
  photo24,
  photo25,
  photo26,
  photo27
);
spot2.photos.push(photo13);
// spot1.photos.push(photo1);
spot3.photos.push(photo2, photo3, photo4, photo5, photo6, photo7);
spot4.photos.push(photo8, photo11);
spot6.photos.push(photo9);
spot7.photos.push(photo10);
spot8.photos.push(photo12);
spot9.photos.push(photo14);
spot10.photos.push(photo15, photo19, photo20, photo21, photo22);
spot12.photos.push(photo16);
spot13.photos.push(photo17);
spot14.photos.push(photo18);
spot15.photos.push(photo23, photo24);
spot16.photos.push(photo25, photo26, photo27);

users[0].photos.push(photo2);
users[0].photos.push(photo3);
users[1].photos.push(photo4);
users[1].photos.push(photo5);
users[0].photos.push(photo6);
users[0].photos.push(photo7);
users[0].photos.push(photo8);
users[1].photos.push(photo9);
users[0].photos.push(photo10);
users[0].photos.push(photo11);
users[0].photos.push(photo12);
users[2].photos.push(photo13);
users[2].photos.push(photo14);
users[0].photos.push(photo15);
users[0].photos.push(photo16);
users[3].photos.push(photo17);
users[3].photos.push(photo18);
users[2].photos.push(photo19);
users[3].photos.push(photo20);
users[2].photos.push(photo21);
users[0].photos.push(photo22);
users[0].photos.push(photo23);
users[0].photos.push(photo24);
users[0].photos.push(photo25);
users[0].photos.push(photo26);
users[0].photos.push(photo27);



//likes
const likes = [];

for (let i = 0; i < 31; i++) {
  let newLike = new Like({ photoId: photos[i % 10], likerId: users[i % 5] });
  likes.push(newLike);
  photos[i % 10].likes.push(newLike);
}
//extra like
// let extraLike = new Like({
//   photoId: badWaterBasin.photos[0]._id,
//   likerId: users[2],
// });
// likes.push(extraLike);
// badWaterBasin.photos[0].likes.push(extraLike);

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
