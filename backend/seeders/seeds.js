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

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.sampleTwo = function () {
  let res = [];
  res.push(this.sample());
  let temp = this.sample();
  while (res[0] === temp) temp = this.sample();
  res.push(temp);
  return res;
};

const NUM_SEED_USERS = 10;

const users = [];

users.push(
  new User({
    username: "demo-user",
    email: "demo-user@gmail.com",
    hashedPassword: bcrypt.hashSync("starwars", 10),
    profilePicUrl:
      "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/def-user-pfp.png",
  })
);

users.push(
  new User({
    username: "Kaushal",
    email: "k@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
    profilePicUrl:
      "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/kaushal.png",
  })
);

users.push(
  new User({
    username: "Nishant",
    email: "nishant@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
    profilePicUrl:
      "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/nishant.png",
  })
);
users.push(
  new User({
    username: "Christine",
    email: "gymrat@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
    profilePicUrl:
      "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/christine.png",
  })
);

users.push(
  new User({
    username: "Morgan",
    email: "morgan@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
    profilePicUrl:
      "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/morgan.png",
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
      profilePicUrl:
        "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/def-user-pfp.png",
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
const spot17 = new Spot({
  latitude: 37.92356,
  longitude: -122.593979,
  name: "Marin",
  comments: [],
  photos: [],
});
const spot18 = new Spot({
  latitude: 37.879823,
  longitude: -121.912935,
  name: "Mt Diablo",
  comments: [],
  photos: [],
});
const spot19 = new Spot({
  latitude: 33.675619,
  longitude: -117.867755,
  name: "John Wanye Airport",
  comments: [],
  photos: [],
});
const spot20 = new Spot({
  latitude: 36.729225,
  longitude: -118.642518,
  name: "Deer",
  comments: [],
  photos: [],
});
const spot21 = new Spot({
  latitude: 41.234583,
  longitude: -123.991183,
  name: "Elk",
  comments: [],
  photos: [],
});
const spot22 = new Spot({
  latitude: 38.03252,
  longitude: -119.058622,
  name: "Mono Lake",
  comments: [],
  photos: [],
});
const spot23 = new Spot({
  latitude: 41.011802,
  longitude: -121.651384,
  name: "Burney Falls",
  comments: [],
  photos: [],
});
const spot24 = new Spot({
  latitude: 40.801672,
  longitude: -124.200076,
  name: "West Coast without sun",
  comments: [],
  photos: [],
});
const spot25 = new Spot({
  latitude: 37.923444,
  longitude: -122.597089,
  name: "Beautiful Site",
  comments: [],
  photos: [],
});
const spot26 = new Spot({
  latitude: 37.8044,
  longitude: -122.2712,
  name: "Oakland Views",
  comments: [],
  photos: [],
});
const spot27 = new Spot({
  latitude: 39.906658,
  longitude: -121.166652,
  name: "Bucks Lake",
  comments: [],
  photos: [],
});

const spot28 = new Spot({ latitude: 39.969835 , longitude: -120.839808 , name: "Plumas National Forest", comments: [] , photos: [] , });
const spot29 = new Spot({
  latitude: 35.991912,
  longitude: -119.721709,
  name: "Tulare Lake",
  comments: [],
  photos: [],
});
const spot30 = new Spot({
  latitude: 36.18432,
  longitude: -119.828462,
  name: "Stratford",
  comments: [],
  photos: [],
});
const spot31 = new Spot({
  latitude: 33.979433,
  longitude: -117.374608,
  name: "Downtown RV",
  comments: [],
  photos: [],
});
const spot32 = new Spot({
  latitude: 38.577219,
  longitude: -121.493734,
  name: "Central Business District",
  comments: [],
  photos: [],
});
const spot33 = new Spot({
  latitude: 38.607274,
  longitude: -121.470388,
  name: "Gardenland",
  comments: [],
  photos: [],
});
const spot34 = new Spot({
  latitude: 39.024912,
  longitude: -122.671948,
  name: "Clear Lake",
  comments: [],
  photos: [],
});
const spot35 = new Spot({
  latitude: 39.163319,
  longitude: -122.913913,
  name: "Upper Lake",
  comments: [],
  photos: [],
});
const spot36 = new Spot({
  latitude: 40.782426,
  longitude: -120.177841,
  name: "Observation Peak",
  comments: [],
  photos: [],
});
const spot37 = new Spot({
  latitude: 40.713375,
  longitude: -120.726933,
  name: "Stones Landing",
  comments: [],
  photos: [],
});
const spot38 = new Spot({
  latitude: 36.882916,
  longitude: -121.354078,
  name: "Fields",
  comments: [],
  photos: [],
});
const spot39 = new Spot({
  latitude: 36.838893,
  longitude: -121.429801,
  name: "Great Fields",
  comments: [],
  photos: [],
});
const spot40 = new Spot({
  latitude: 34.228933,
  longitude: -118.05687,
  name: "Mt. Wilson",
  comments: [],
  photos: [],
});
const spot41 = new Spot({
  latitude: 34.089855,
  longitude: -118.328746,
  name: "Hollywood",
  comments: [],
  photos: [],
});
const spot42 = new Spot({
  latitude: 37.228087,
  longitude: -119.50928,
  name: "North Fork",
  comments: [],
  photos: [],
});
const spot43 = new Spot({
  latitude: 37.566885,
  longitude: -119.388153,
  name: "Gale Peak",
  comments: [],
  photos: [],
});
const spot44 = new Spot({
  latitude: 32.711074,
  longitude: -117.24223,
  name: "SD Beaches",
  comments: [],
  photos: [],
});
const spot45 = new Spot({
  latitude: 37.923488,
  longitude: -122.596606,
  name: "Mt Tam",
  comments: [],
  photos: [],
});
const spot46 = new Spot({
  latitude: 37.858748,
  longitude: -122.486561,
  name: "Sausalito",
  comments: [],
  photos: [],
});
const spot47 = new Spot({
  latitude: 37.900526,
  longitude: -121.340871,
  name: "Joaquin",
  comments: [],
  photos: [],
});
const spot48 = new Spot({
  latitude: 38.026121,
  longitude: -121.453481,
  name: "Joaquin Peace",
  comments: [],
  photos: [],
});
const spot49 = new Spot({
  latitude: 35.41932,
  longitude: -120.817598,
  name: "SLO",
  comments: [],
  photos: [],
});
const spot50 = new Spot({
  latitude: 35.141296,
  longitude: -120.608858,
  name: "Pismo Beach",
  comments: [],
  photos: [],
});
const spot51 = new Spot({
  latitude: 39.321517,
  longitude: -123.113379,
  name: "Potter Valley",
  comments: [],
  photos: [],
});
const spot52 = new Spot({
  latitude: 39.437663,
  longitude: -123.383347,
  name: "Brooktrails",
  comments: [],
  photos: [],
});
const spot53 = new Spot({
  latitude: 37.572572,
  longitude: -122.299496,
  name: "Seal Point Prk",
  comments: [],
  photos: [],
});
const spot54 = new Spot({
  latitude: 37.344716,
  longitude: -120.759048,
  name: "Strawberry Patch",
  comments: [],
  photos: [],
});
const spot55 = new Spot({
  latitude: 36.991604,
  longitude: -120.927242,
  name: "Los Banos",
  comments: [],
  photos: [],
});
const spot56 = new Spot({
  latitude: 34.399027,
  longitude: -119.708524,
  name: "SB Vibes",
  comments: [],
  photos: [],
});
const spot57 = new Spot({
  latitude: 34.412027,
  longitude: -119.841432,
  name: "Isla Vista",
  comments: [],
  photos: [],
});
const spot58 = new Spot({
  latitude: 37.387841,
  longitude: -121.974078,
  name: "South Bay but not SJ",
  comments: [],
  photos: [],
});
const spot59 = new Spot({
  latitude: 37.404751,
  longitude: -121.981288,
  name: "Santa Clara Embrace",
  comments: [],
  photos: [],
});
const spot60 = new Spot({
  latitude: 37.486624,
  longitude: -119.970754,
  name: "Mariposa Embrace",
  comments: [],
  photos: [],
});
const spot61 = new Spot({
  latitude: 41.407531,
  longitude: -120.678232,
  name: "California Pines",
  comments: [],
  photos: [],
});
const spot62 = new Spot({
  latitude: 41.834889,
  longitude: -120.359977,
  name: "Goose Lake",
  comments: [],
  photos: [],
});
const spot63 = new Spot({
  latitude: 37.689194,
  longitude: -121.786609,
  name: "Livermore Hills",
  comments: [],
  photos: [],
});
const spot64 = new Spot({
  latitude: 37.803701,
  longitude: -122.252016,
  name: "Oakland Views",
  comments: [],
  photos: [],
});
const spot65 = new Spot({
  latitude: 38.030007,
  longitude: -119.062793,
  name: "Mono Lake",
  comments: [],
  photos: [],
});
const spot66 = new Spot({
  latitude: 37.998852,
  longitude: -119.039481,
  name: "Paoha Island",
  comments: [],
  photos: [],
});
const spot67 = new Spot({
  latitude: 36.602608,
  longitude: -121.893618,
  name: "Monterey Bay",
  comments: [],
  photos: [],
});
const spot68 = new Spot({
  latitude: 36.554865,
  longitude: -121.930363,
  name: "Carmel",
  comments: [],
  photos: [],
});
const spot69 = new Spot({
  latitude: 38.710719,
  longitude: -119.875844,
  name: "Alpine Mountains",
  comments: [],
  photos: [],
});
const spot70 = new Spot({
  latitude: 38.47673,
  longitude: -120.048878,
  name: "Bear Valley",
  comments: [],
  photos: [],
});
const spot71 = new Spot({
  latitude: 38.298678,
  longitude: -122.278738,
  name: "Napa Valley",
  comments: [],
  photos: [],
});
const spot72 = new Spot({
  latitude: 38.482861,
  longitude: -122.446171,
  name: "Zinfandel",
  comments: [],
  photos: [],
});
const spot73 = new Spot({
  latitude: 38.688584,
  longitude: -120.063063,
  name: "Kirkwood",
  comments: [],
  photos: [],
});
const spot74 = new Spot({
  latitude: 38.421165,
  longitude: -120.672169,
  name: "Pine Grove",
  comments: [],
  photos: [],
});
const spot75 = new Spot({
  latitude: 39.405707,
  longitude: -120.55694,
  name: "5 Lakes Basin",
  comments: [],
  photos: [],
});
const spot76 = new Spot({
  latitude: 39.23665,
  longitude: -121.209485,
  name: "Lake Wildwood",
  comments: [],
  photos: [],
});
const spot77 = new Spot({
  latitude: 33.769148,
  longitude: -117.701465,
  name: "Silverado",
  comments: [],
  photos: [],
});
const spot78 = new Spot({
  latitude: 37.071128,
  longitude: -121.986529,
  name: "Santa Cruz",
  comments: [],
  photos: [],
});
const spot79 = new Spot({
  latitude: 39.532079,
  longitude: -121.776494,
  name: "Butte Forest",
  comments: [],
  photos: [],
});
const spot80 = new Spot({
  latitude: 39.507696,
  longitude: -121.54873,
  name: "Oroville Views",
  comments: [],
  photos: [],
});
const spot81 = new Spot({
  latitude: 33.593696,
  longitude: -117.876092,
  name: "Corona Del Mar",
  comments: [],
  photos: [],
});
const spot82 = new Spot({
  latitude: 40.862732,
  longitude: -122.359313,
  name: "Shasta",
  comments: [],
  photos: [],
});
const spot83 = new Spot({
  latitude: 40.927093,
  longitude: -121.625976,
  name: "Lake Shasta",
  comments: [],
  photos: [],
});
const spot84 = new Spot({
  latitude: 39.186336,
  longitude: -120.095212,
  name: "Dollar Point",
  comments: [],
  photos: [],
});
const spot85 = new Spot({
  latitude: 38.761631,
  longitude: -121.165135,
  name: "Granite Bay",
  comments: [],
  photos: [],
});
const spot86 = new Spot({
  latitude: 39.559534,
  longitude: -120.764373,
  name: "Sierra City",
  comments: [],
  photos: [],
});
const spot87 = new Spot({
  latitude: 39.61351,
  longitude: -120.352386,
  name: "Sierraville",
  comments: [],
  photos: [],
});
const spot88 = new Spot({
  latitude: 41.764315,
  longitude: -122.06359,
  name: "Mt. Hebron",
  comments: [],
  photos: [],
});
const spot89 = new Spot({
  latitude: 41.823698,
  longitude: -123.321524,
  name: "Pacific Coast Ranges",
  comments: [],
  photos: [],
});
const spot90 = new Spot({
  latitude: 38.347546,
  longitude: -121.975432,
  name: "Vacaville",
  comments: [],
  photos: [],
});
const spot91 = new Spot({
  latitude: 38.460545,
  longitude: -121.842222,
  name: "Dixon",
  comments: [],
  photos: [],
});
const spot92 = new Spot({
  latitude: 38.349759,
  longitude: -123.028457,
  name: "Bodega Bay",
  comments: [],
  photos: [],
});
const spot93 = new Spot({
  latitude: 38.471356,
  longitude: -122.740066,
  name: "Santa Rosa",
  comments: [],
  photos: [],
});
const spot94 = new Spot({
  latitude: 37.471014,
  longitude: -121.146536,
  name: "Peterson",
  comments: [],
  photos: [],
});
const spot95 = new Spot({
  latitude: 37.717836,
  longitude: -120.835546,
  name: "Oakdale",
  comments: [],
  photos: [],
});
const spot96 = new Spot({
  latitude: 39.186046,
  longitude: -121.825559,
  name: "Sutter",
  comments: [],
  photos: [],
});
const spot97 = new Spot({
  latitude: 38.869198,
  longitude: -121.537168,
  name: "Pleasant Grove",
  comments: [],
  photos: [],
});
const spot98 = new Spot({
  latitude: 40.25806,
  longitude: -122.309478,
  name: "Red Bluff",
  comments: [],
  photos: [],
});
const spot99 = new Spot({
  latitude: 39.89869,
  longitude: -122.196868,
  name: "Corning",
  comments: [],
  photos: [],
});
const spot100 = new Spot({
  latitude: 40.702463,
  longitude: -122.930413,
  name: "Douglas City",
  comments: [],
  photos: [],
});
const spot101 = new Spot({
  latitude: 40.420773,
  longitude: -123.455011,
  name: "Mad River",
  comments: [],
  photos: [],
});
const spot102 = new Spot({
  latitude: 36.579397,
  longitude: -118.565611,
  name: "Sequoia National Park",
  comments: [],
  photos: [],
});
const spot103 = new Spot({
  latitude: 35.997152,
  longitude: -118.757872,
  name: "California Hot Springs",
  comments: [],
  photos: [],
});
const spot104 = new Spot({
  latitude: 37.919616,
  longitude: -120.409529,
  name: "Red Hills",
  comments: [],
  photos: [],
});
const spot105 = new Spot({
  latitude: 38.261158,
  longitude: -119.986556,
  name: "National Forest",
  comments: [],
  photos: [],
});
const spot106 = new Spot({
  latitude: 34.2923,
  longitude: -119.224894,
  name: "Oxnard",
  comments: [],
  photos: [],
});
const spot107 = new Spot({
  latitude: 34.696984,
  longitude: -119.363201,
  name: "Los Padres National Forest",
  comments: [],
  photos: [],
});
const spot108 = new Spot({
  latitude: 38.816309,
  longitude: -122.144209,
  name: "Woodland",
  comments: [],
  photos: [],
});
const spot109 = new Spot({
  latitude: 38.647047,
  longitude: -121.752821,
  name: "Capay",
  comments: [],
  photos: [],
});
const spot110 = new Spot({
  latitude: 39.118931,
  longitude: -121.524825,
  name: "Linda",
  comments: [],
  photos: [],
});
const spot111 = new Spot({
  latitude: 39.45905,
  longitude: -121.132064,
  name: "Oregon House",
  comments: [],
  photos: [],
});
const spot112 = new Spot({
  latitude: 38.256113,
  longitude: -120.359558,
  name: "Arnold Trees",
  comments: [],
  photos: [],
});
const spot113 = new Spot({
  latitude: 38.153867,
  longitude: -120.383755,
  name: "Murphys mountain views",
  comments: [],
  photos: [],
});
const spot114 = new Spot({
  latitude: 39.308641,
  longitude: -122.341854,
  name: "Sites mountains",
  comments: [],
  photos: [],
});
const spot115 = new Spot({
  latitude: 39.300832,
  longitude: -122.487178,
  name: "Interior design in Lodoga",
  comments: [],
  photos: [],
});
const spot116 = new Spot({
  latitude: 37.881251,
  longitude: -121.914153,
  name: "Mt. Diablo",
  comments: [],
  photos: [],
});
const spot117 = new Spot({
  latitude: 37.93483,
  longitude: -122.065975,
  name: "Walnut Creek",
  comments: [],
  photos: [],
});
const spot118 = new Spot({
  latitude: 41.671081,
  longitude: -123.960245,
  name: "Ocean Views",
  comments: [],
  photos: [],
});
const spot119 = new Spot({
  latitude: 41.890231,
  longitude: -123.7158,
  name: "Redwoods",
  comments: [],
  photos: [],
});
const spot120 = new Spot({
  latitude: 38.744229,
  longitude: -120.293128,
  name: "Eldorado National Forest",
  comments: [],
  photos: [],
});
const spot121 = new Spot({
  latitude: 38.93795,
  longitude: -119.990038,
  name: "South Lake Tahoe",
  comments: [],
  photos: [],
});
const spot122 = new Spot({
  latitude: 36.727662,
  longitude: -119.812953,
  name: "Fresno City",
  comments: [],
  photos: [],
});
const spot123 = new Spot({
  latitude: 37.102815,
  longitude: -119.298728,
  name: "Shaver Lake",
  comments: [],
  photos: [],
});
const spot124 = new Spot({
  latitude: 39.603152,
  longitude: -122.541939,
  name: "Elk Creek",
  comments: [],
  photos: [],
});
const spot125 = new Spot({
  latitude: 39.588245,
  longitude: -122.801767,
  name: "Mendocino National Forest",
  comments: [],
  photos: [],
});
const spot126 = new Spot({
  latitude: 40.715606,
  longitude: -124.158907,
  name: "Eureka Pups",
  comments: [],
  photos: [],
});
const spot127 = new Spot({
  latitude: 41.176616,
  longitude: -124.082325,
  name: "Humboldt views",
  comments: [],
  photos: [],
});
const spot128 = new Spot({
  latitude: 32.882881,
  longitude: -115.362237,
  name: "Imperial Fields",
  comments: [],
  photos: [],
});
const spot129 = new Spot({
  latitude: 33.067211,
  longitude: -115.4721,
  name: "Imperial Pups",
  comments: [],
  photos: [],
});
const spot130 = new Spot({
  latitude: 36.775831,
  longitude: -117.496483,
  name: "Death Valley",
  comments: [],
  photos: [],
});
const spot131 = new Spot({
  latitude: 36.121881,
  longitude: -116.809838,
  name: "Salt in Death Valley",
  comments: [],
  photos: [],
});
const spot132 = new Spot({
  latitude: 35.418965,
  longitude: -118.906816,
  name: "bakersfield views",
  comments: [],
  photos: [],
});
const spot133 = new Spot({
  latitude: 35.526331,
  longitude: -119.00844,
  name: "Bakersfield ",
  comments: [],
  photos: [],
});


spots.push(tunnelPoint, coitTower, halfDome, badWaterBasin);
spots.push(
  spot1,
  spot2,
  spot3,
  spot4,
  spot5,
  spot6,
  spot7,
  spot8,
  spot9,
  spot10,
  spot11,
  spot12,
  spot13,
  spot14,
  spot15,
  spot16,
  spot17,
  spot18,
  spot19,
  spot20,
  spot21,
  spot22,
  spot23,
  spot24,
  spot25,
  spot26,
  spot27,
  spot28,
  spot29,
  spot30,
  spot31,
  spot32,
  spot33,
  spot34,
  spot35,
  spot36,
  spot37,
  spot38,
  spot39,
  spot40,
  spot41,
  spot42,
  spot43,
  spot44,
  spot45,
  spot46,
  spot47,
  spot48,
  spot49,
  spot50,
  spot51,
  spot52,
  spot53,
  spot54,
  spot55,
  spot56,
  spot57,
  spot58,
  spot59,
  spot60,
  spot61,
  spot62,
  spot63,
  spot64,
  spot65,
  spot66,
  spot67,
  spot68,
  spot69,
  spot70,
  spot71,
  spot72,
  spot73,
  spot74,
  spot75,
  spot76,
  spot77,
  spot78,
  spot79,
  spot80,
  spot81,
  spot82,
  spot83,
  spot84,
  spot85,
  spot86,
  spot87,
  spot88,
  spot89,
  spot90,
  spot91,
  spot92,
  spot93,
  spot94,
  spot95,
  spot96,
  spot97,
  spot98,
  spot99,
  spot100,
  spot101,
  spot102,
  spot103,
  spot104,
  spot105,
  spot106,
  spot107,
  spot108,
  spot109,
  spot110,
  spot111,
  spot112,
  spot113,
  spot114,
  spot115,
  spot116,
  spot117,
  spot118,
  spot119,
  spot120,
  spot121,
  spot122,
  spot123,
  spot124,
  spot125,
  spot126,
  spot127,
  spot128,
  spot129,
  spot130,
  spot131,
  spot132,
  spot133
);

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
locations[20].spots.push(spot17);
locations[6].spots.push(spot18);
locations[29].spots.push(spot19);
locations[53].spots.push(spot20);
locations[11].spots.push(spot21);
locations[25].spots.push(spot22);
locations[44].spots.push(spot23);
locations[11].spots.push(spot24);
locations[20].spots.push(spot25);
locations[30].spots.push(spot26);
locations[30].spots.push(spot26);
locations[31].spots.push(spot27);
locations[31].spots.push(spot28);
locations[15].spots.push(spot29);
locations[15].spots.push(spot30);
locations[32].spots.push(spot31);
locations[33].spots.push(spot32);
locations[33].spots.push(spot33);
locations[16].spots.push(spot34);
locations[16].spots.push(spot35);
locations[17].spots.push(spot36);
locations[17].spots.push(spot37);
locations[34].spots.push(spot38);
locations[34].spots.push(spot39);
locations[18].spots.push(spot40);
locations[18].spots.push(spot41);
locations[19].spots.push(spot42);
locations[19].spots.push(spot43);
locations[36].spots.push(spot44);
locations[20].spots.push(spot45);
locations[20].spots.push(spot46);
locations[38].spots.push(spot47);
locations[38].spots.push(spot48);
locations[39].spots.push(spot49);
locations[39].spots.push(spot50);
locations[22].spots.push(spot51);
locations[22].spots.push(spot52);
locations[40].spots.push(spot53);
locations[23].spots.push(spot54);
locations[23].spots.push(spot55);
locations[41].spots.push(spot56);
locations[41].spots.push(spot57);
locations[42].spots.push(spot58);
locations[42].spots.push(spot59);
locations[21].spots.push(spot60);
locations[24].spots.push(spot61);
locations[24].spots.push(spot62);
locations[0].spots.push(spot63);
locations[0].spots.push(spot64);
locations[25].spots.push(spot65);
locations[25].spots.push(spot66);
locations[26].spots.push(spot67);
locations[26].spots.push(spot68);
locations[1].spots.push(spot69);
locations[1].spots.push(spot70);
locations[27].spots.push(spot71);
locations[27].spots.push(spot72);
locations[2].spots.push(spot73);
locations[2].spots.push(spot74);
locations[28].spots.push(spot75);
locations[28].spots.push(spot76);
locations[29].spots.push(spot77);
locations[43].spots.push(spot78);
locations[3].spots.push(spot79);
locations[3].spots.push(spot80);
locations[29].spots.push(spot81);
locations[44].spots.push(spot82);
locations[44].spots.push(spot83);
locations[30].spots.push(spot84);
locations[30].spots.push(spot85);
locations[45].spots.push(spot86);
locations[45].spots.push(spot87);
locations[46].spots.push(spot88);
locations[46].spots.push(spot89);
locations[47].spots.push(spot90);
locations[47].spots.push(spot91);
locations[48].spots.push(spot92);
locations[48].spots.push(spot93);
locations[49].spots.push(spot94);
locations[49].spots.push(spot95);
locations[50].spots.push(spot96);
locations[50].spots.push(spot97);
locations[51].spots.push(spot98);
locations[51].spots.push(spot99);
locations[52].spots.push(spot100);
locations[52].spots.push(spot101);
locations[53].spots.push(spot102);
locations[53].spots.push(spot103);
locations[54].spots.push(spot104);
locations[54].spots.push(spot105);
locations[55].spots.push(spot106);
locations[55].spots.push(spot107);
locations[56].spots.push(spot108);
locations[56].spots.push(spot109);
locations[57].spots.push(spot110);
locations[57].spots.push(spot111);
locations[4].spots.push(spot112);
locations[4].spots.push(spot113);
locations[5].spots.push(spot114);
locations[5].spots.push(spot115);
locations[6].spots.push(spot116);
locations[6].spots.push(spot117);
locations[7].spots.push(spot118);
locations[7].spots.push(spot119);
locations[8].spots.push(spot120);
locations[8].spots.push(spot121);
locations[9].spots.push(spot122);
locations[9].spots.push(spot123);
locations[10].spots.push(spot124);
locations[10].spots.push(spot125);
locations[11].spots.push(spot126);
locations[11].spots.push(spot127);
locations[12].spots.push(spot128);
locations[12].spots.push(spot129);
locations[13].spots.push(spot130);
locations[13].spots.push(spot131);
locations[14].spots.push(spot132);
locations[14].spots.push(spot133);


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

const conditions = [
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

const bestTimesOfDay = [
  "first light",
  "sunrise",
  "afternoon",
  "sunset",
  "golden hour",
  "night",
];

const payments = ["0", "$", "$$", "$$$"];

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
  transportation: ["hike", "walk"],
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
  transportation: ["hike", "walk"],
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

let photo28 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/peir39.jpg",
  spotId: spot2._id,
  userId: users[0]._id,
  latitude: 37.811266,
  longitude: -122.410558,
  genre: "wildlife",
  description: "I love the peir seals",
  condition: ["windy"],
  transportation: ["walk,car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo29 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/downtown-la.jpg",
  spotId: spot4._id,
  userId: users[0]._id,
  latitude: 34.067952,
  longitude: -118.274435,
  genre: "aerial",
  description: "la heights",
  condition: ["windy"],
  transportation: ["car"],
  bestTimeOfDay: "golden hour",
  payment: "0",
  likes: [],
});
let photo30 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/windy-tamalpais.jpg",
  spotId: spot17._id,
  userId: users[0]._id,
  latitude: 37.92356,
  longitude: -122.593979,
  genre: "landscape",
  description: "new background",
  condition: ["windy"],
  transportation: ["car", "hike"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo31 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mt-diablo-hills.jpg",
  spotId: spot18._id,
  userId: users[0]._id,
  latitude: 37.879823,
  longitude: -121.912935,
  genre: "landscape",
  description: "windy diablo hills",
  condition: ["windy"],
  transportation: ["hike"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo32 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/john-wayne-plane.jpg",
  spotId: spot19._id,
  userId: users[0]._id,
  latitude: 33.675619,
  longitude: -117.867755,
  genre: "landscape",
  description: "John Wanye Airport",
  condition: ["heat"],
  transportation: ["car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo33 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/deer-kings.jpg",
  spotId: spot20._id,
  userId: users[0]._id,
  latitude: 36.729225,
  longitude: -118.642518,
  genre: "wildlife",
  description: "Bambi",
  condition: ["windy"],
  transportation: ["car", "hike"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo34 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/redwood-elk.jpg",
  spotId: spot21._id,
  userId: users[0]._id,
  latitude: 41.234583,
  longitude: -123.991183,
  genre: "wildlife",
  description: "Elk",
  condition: ["windy"],
  transportation: ["car", "hike"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo35 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mono-lake.jpg",
  spotId: spot22._id,
  userId: users[0]._id,
  latitude: 38.03252,
  longitude: -119.058622,
  genre: "landscape",
  description: "Pretty lake",
  condition: ["heat"],
  transportation: ["car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo36 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/burney-falls.jpg",
  spotId: spot23._id,
  userId: users[0]._id,
  latitude: 41.011802,
  longitude: -121.651384,
  genre: "landscape",
  description: "Burney Falls",
  condition: ["windy"],
  transportation: ["car", "hike"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo37 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/samoa-beach.jpg",
  spotId: spot24._id,
  userId: users[0]._id,
  latitude: 40.801672,
  longitude: -124.200076,
  genre: "landscape",
  description: "West Coast without sun",
  condition: ["windy"],
  transportation: ["car", "hike"],
  bestTimeOfDay: "sunset",
  payment: "0",
  likes: [],
});
let photo38 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mt-tamalpais.jpg",
  spotId: spot25._id,
  userId: users[0]._id,
  latitude: 37.923444,
  longitude: -122.597089,
  genre: "landscape",
  description: "Beautiful Site",
  condition: ["windy"],
  transportation: ["car", "hike"],
  bestTimeOfDay: "sunrise",
  payment: "0",
  likes: [],
});
let photo40 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/winter-trees.jpeg",
  spotId: spot34._id,
  userId: users[4]._id,
  latitude: 39.024912,
  longitude: -122.671948,
  genre: "landscape",
  description: "Winter trees",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo41 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/vintage-car.jpeg",
  spotId: spot34._id,
  userId: users[2]._id,
  latitude: 39.024912,
  longitude: -122.671948,
  genre: "street",
  description: "Vintage car",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo42 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/stairs-texture.jpeg",
  spotId: spot34._id,
  userId: users[0]._id,
  latitude: 39.024912,
  longitude: -122.671948,
  genre: "street",
  description: "Stairs texture",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo43 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/smoke-bomb.jpeg",
  spotId: spot34._id,
  userId: users[1]._id,
  latitude: 39.024912,
  longitude: -122.671948,
  genre: "portrait",
  description: "Smoke bomb",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo44 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shutter-texture.jpeg",
  spotId: spot34._id,
  userId: users[3]._id,
  latitude: 39.024912,
  longitude: -122.671948,
  genre: "street",
  description: "Shutter texture",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo45 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/riot-amidst-gas.jpeg",
  spotId: spot35._id,
  userId: users[4]._id,
  latitude: 39.163319,
  longitude: -122.913913,
  genre: "street",
  description: "Riot",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo46 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/living-contrast.jpeg",
  spotId: spot35._id,
  userId: users[2]._id,
  latitude: 39.163319,
  longitude: -122.913913,
  genre: "street",
  description: "Contrast.",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo47 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/leaves-texture.jpeg",
  spotId: spot35._id,
  userId: users[1]._id,
  latitude: 39.163319,
  longitude: -122.913913,
  genre: "street",
  description: "Leaves",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo48 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/fire-night.jpeg",
  spotId: spot35._id,
  userId: users[3]._id,
  latitude: 39.163319,
  longitude: -122.913913,
  genre: "street",
  description: "Men walking in fire",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo49 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/cute-horsey.jpeg",
  spotId: spot35._id,
  userId: users[4]._id,
  latitude: 39.163319,
  longitude: -122.913913,
  genre: "wildlife",
  description: "Cute horsey",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo50 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/zebra-black-and-white.jpeg",
  spotId: spot29._id,
  userId: users[4]._id,
  latitude: 35.991912,
  longitude: -119.721709,
  genre: "landscape",
  description: "Mountain range in the sunset",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo51 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yellow-bird.jpeg",
  spotId: spot29._id,
  userId: users[2]._id,
  latitude: 35.991912,
  longitude: -119.721709,
  genre: "landscape",
  description: "Mountain range in the afternoon",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo52 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/winter-jog.jpeg",
  spotId: spot29._id,
  userId: users[0]._id,
  latitude: 35.991912,
  longitude: -119.721709,
  genre: "landscape",
  description: "Cloudy sky",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo53 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tower-night.jpeg",
  spotId: spot29._id,
  userId: users[1]._id,
  latitude: 35.991912,
  longitude: -119.721709,
  genre: "wildlife",
  description: "KITTENS!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo54 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/skyscraper-white-sky.jpeg",
  spotId: spot29._id,
  userId: users[3]._id,
  latitude: 35.991912,
  longitude: -119.721709,
  genre: "landscape",
  description: "Best Place Ever!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo55 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pupper.jpeg",
  spotId: spot30._id,
  userId: users[4]._id,
  latitude: 36.18432,
  longitude: -119.828462,
  genre: "landscape",
  description: "I love Joshua",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo56 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mountain-range-sunset.jpeg",
  spotId: spot30._id,
  userId: users[2]._id,
  latitude: 36.18432,
  longitude: -119.828462,
  genre: "landscape",
  description: "A Must Visit",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo57 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mountain-range-afternoon.jpeg",
  spotId: spot30._id,
  userId: users[1]._id,
  latitude: 36.18432,
  longitude: -119.828462,
  genre: "landscape",
  description: "I cannot wait to come back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo58 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/midday-cloudy-sky.jpeg",
  spotId: spot30._id,
  userId: users[3]._id,
  latitude: 36.18432,
  longitude: -119.828462,
  genre: "street",
  description: "Riverside Vibes",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo59 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/kittens.jpeg",
  spotId: spot30._id,
  userId: users[4]._id,
  latitude: 36.18432,
  longitude: -119.828462,
  genre: "street",
  description: "SoCal Vibes",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo60 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/riverside-joshua1.jpg",
  spotId: spot7._id,
  userId: users[4]._id,
  latitude: 33.980906,
  longitude: -116.241798,
  genre: "street",
  description: "Must visit",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo61 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/riverside-joshua2.jpg",
  spotId: spot7._id,
  userId: users[2]._id,
  latitude: 33.980906,
  longitude: -116.241798,
  genre: "street",
  description: "Loving this weather",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo62 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/riverside-joshua3.jpg",
  spotId: spot7._id,
  userId: users[0]._id,
  latitude: 33.980906,
  longitude: -116.241798,
  genre: "street",
  description: "Riverside",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo63 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/riverside-joshua4.jpg",
  spotId: spot7._id,
  userId: users[1]._id,
  latitude: 33.980906,
  longitude: -116.241798,
  genre: "street",
  description: "The Capitol",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo64 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/riverside-downtown2.jpg",
  spotId: spot31._id,
  userId: users[3]._id,
  latitude: 33.979433,
  longitude: -117.374608,
  genre: "street",
  description: "I love SacTown",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo65 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/riverside-downtown4.jpg",
  spotId: spot31._id,
  userId: users[4]._id,
  latitude: 33.979433,
  longitude: -117.374608,
  genre: "street",
  description: "Great place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo66 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/riverside-downtown5.jpg",
  spotId: spot31._id,
  userId: users[2]._id,
  latitude: 33.979433,
  longitude: -117.374608,
  genre: "street",
  description: "Must Visit",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo67 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/riverside-downtown3.jpg",
  spotId: spot31._id,
  userId: users[1]._id,
  latitude: 33.979433,
  longitude: -117.374608,
  genre: "street",
  description: "Great time here",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo68 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/riverside-downtown1.jpg",
  spotId: spot31._id,
  userId: users[3]._id,
  latitude: 33.979433,
  longitude: -117.374608,
  genre: "street",
  description: "Lovely Place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo69 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sac-business5.jpg",
  spotId: spot32._id,
  userId: users[4]._id,
  latitude: 38.577219,
  longitude: -121.493734,
  genre: "street",
  description: "Wow",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo70 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sac-business1.jpg",
  spotId: spot32._id,
  userId: users[4]._id,
  latitude: 38.577219,
  longitude: -121.493734,
  genre: "street",
  description: "I love Sac",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo71 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sac-business2.jpg",
  spotId: spot32._id,
  userId: users[2]._id,
  latitude: 38.577219,
  longitude: -121.493734,
  genre: "street",
  description: "SacTownn",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo72 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sac-business3.jpg",
  spotId: spot32._id,
  userId: users[0]._id,
  latitude: 38.577219,
  longitude: -121.493734,
  genre: "street",
  description: "The bridge",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo73 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sac-business4.jpg",
  spotId: spot32._id,
  userId: users[1]._id,
  latitude: 38.577219,
  longitude: -121.493734,
  genre: "landscape",
  description: "Peace",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo74 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sac-bridge2.jpg",
  spotId: spot33._id,
  userId: users[3]._id,
  latitude: 38.607274,
  longitude: -121.470388,
  genre: "landscape",
  description: "Escape",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo75 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sac-bridge3.jpg",
  spotId: spot33._id,
  userId: users[4]._id,
  latitude: 38.607274,
  longitude: -121.470388,
  genre: "landscape",
  description: "Vibes",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo76 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sac-bridge4.jpg",
  spotId: spot33._id,
  userId: users[2]._id,
  latitude: 38.607274,
  longitude: -121.470388,
  genre: "landscape",
  description: "Love & Peace",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo77 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sac-bridge5.jpg",
  spotId: spot33._id,
  userId: users[1]._id,
  latitude: 38.607274,
  longitude: -121.470388,
  genre: "landscape",
  description: "Vibezz",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo78 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sac-bridge1.jpg",
  spotId: spot33._id,
  userId: users[3]._id,
  latitude: 38.607274,
  longitude: -121.470388,
  genre: "landscape",
  description: "Peace",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo79 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/benito-fields1.jpg",
  spotId: spot38._id,
  userId: users[4]._id,
  latitude: 36.882916,
  longitude: -121.354078,
  genre: "landscape",
  description: "Escape",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo80 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/benito-fields2.jpg",
  spotId: spot38._id,
  userId: users[4]._id,
  latitude: 36.882916,
  longitude: -121.354078,
  genre: "landscape",
  description: "Vibes",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo81 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/benito-fields3.jpg",
  spotId: spot38._id,
  userId: users[2]._id,
  latitude: 36.882916,
  longitude: -121.354078,
  genre: "landscape",
  description: "Love & Peace",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo82 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/benito-fields4.jpg",
  spotId: spot38._id,
  userId: users[0]._id,
  latitude: 36.882916,
  longitude: -121.354078,
  genre: "landscape",
  description: "Vibezz",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo83 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/benito-fields5.jpg",
  spotId: spot38._id,
  userId: users[1]._id,
  latitude: 36.882916,
  longitude: -121.354078,
  genre: "street",
  description: "SoCallll!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo84 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/benito-greatField1.jpg",
  spotId: spot39._id,
  userId: users[3]._id,
  latitude: 36.838893,
  longitude: -121.429801,
  genre: "street",
  description: "Great Food",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo85 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/benito-greatField2.jpg",
  spotId: spot39._id,
  userId: users[4]._id,
  latitude: 36.838893,
  longitude: -121.429801,
  genre: "street",
  description: "The Best Weather",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo86 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/benito-greatField3.jpg",
  spotId: spot39._id,
  userId: users[2]._id,
  latitude: 36.838893,
  longitude: -121.429801,
  genre: "street",
  description: "Love it here",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo87 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/benito-greatField4.jpg",
  spotId: spot39._id,
  userId: users[1]._id,
  latitude: 36.838893,
  longitude: -121.429801,
  genre: "street",
  description: "Must visit again",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo88 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/benito-greatField5.jpg",
  spotId: spot39._id,
  userId: users[3]._id,
  latitude: 36.838893,
  longitude: -121.429801,
  genre: "street",
  description: "Love it here",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo89 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bernardino1.jpg",
  spotId: spot11._id,
  userId: users[4]._id,
  latitude: 35.615724,
  longitude: -117.368011,
  genre: "street",
  description: "Must visit again",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo90 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bernardino2.jpg",
  spotId: spot11._id,
  userId: users[0]._id,
  latitude: 35.615724,
  longitude: -117.368011,
  genre: "street",
  description: "tunnel",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo91 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bernardino3.jpg",
  spotId: spot11._id,
  userId: users[1]._id,
  latitude: 35.615724,
  longitude: -117.368011,
  genre: "landscape",
  description: "Amazing Lake",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo92 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bernardino4.jpg",
  spotId: spot11._id,
  userId: users[3]._id,
  latitude: 35.615724,
  longitude: -117.368011,
  genre: "landscape",
  description: "Beautiful Lake",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo93 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bernardino5.jpg",
  spotId: spot11._id,
  userId: users[4]._id,
  latitude: 35.615724,
  longitude: -117.368011,
  genre: "landscape",
  description: "Did not see any bucks",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo94 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sunny-sd1.jpg",
  spotId: spot16._id,
  userId: users[2]._id,
  latitude: 32.8853829048403,
  longitude: -117.12275083609,
  genre: "landscape",
  description: "Will return",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo95 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sunny-sd2.jpg",
  spotId: spot16._id,
  userId: users[1]._id,
  latitude: 32.8853829048403,
  longitude: -117.12275083609,
  genre: "landscape",
  description: "I love Buck Lake",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo96 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tunnel.jpeg",
  spotId: spot45._id,
  userId: users[3]._id,
  latitude: 37.923488,
  longitude: -122.596606,
  genre: "landscape",
  description: "Lovely Park",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo97 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bucks-lake1.jpg",
  spotId: spot27._id,
  userId: users[4]._id,
  latitude: 39.906658,
  longitude: -121.166652,
  genre: "landscape",
  description: "Must visit park",
  condition: ["windy"],
  transportation: ["walk,car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo98 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bucks-lake2.jpg",
  spotId: spot27._id,
  userId: users[2]._id,
  latitude: 39.906658,
  longitude: -121.166452,
  genre: "landscape",
  description: "Secret Treasure",
  condition: ["windy"],
  transportation: ["walk,car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo99 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bucks-lake3.jpg",
  spotId: spot27._id,
  userId: users[0]._id,
  latitude: 39.906658,
  longitude: -121.166552,
  genre: "landscape",
  description: "Awesome trees",
  condition: ["windy"],
  transportation: ["walk,car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo100 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bucks-lake4.jpg",
  spotId: spot27._id,
  userId: users[1]._id,
  latitude: 39.906658,
  longitude: -121.166652,
  genre: "landscape",
  description: "I love Plumas County",
  condition: ["windy"],
  transportation: ["walk,car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo101 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bucks-lake5.jpg",
  spotId: spot27._id,
  userId: users[3]._id,
  latitude: 39.906658,
  longitude: -121.166652,
  genre: "portrait",
  description: "sunflower",
  condition: ["windy"],
  transportation: ["walk,car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo102 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/plumas-national1.jpg",
  spotId: spot28._id,
  userId: users[4]._id,
  latitude: 39.969835,
  longitude: -120.839808,
  genre: "portrait",
  description: "noodles",
  condition: ["windy"],
  transportation: ["walk,car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo103 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/plumas-national2.jpg",
  spotId: spot28._id,
  userId: users[2]._id,
  latitude: 39.969835,
  longitude: -120.839808,
  genre: "landscape",
  description: "hot air balloon in the sky",
  condition: ["windy"],
  transportation: ["walk,car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo104 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/plumas-national3.jpg",
  spotId: spot28._id,
  userId: users[1]._id,
  latitude: 39.969835,
  longitude: -120.839808,
  genre: "street",
  description: "tower in the day",
  condition: ["windy"],
  transportation: ["walk,car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo105 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/plumas-national4.jpg",
  spotId: spot28._id,
  userId: users[3]._id,
  latitude: 39.969835,
  longitude: -120.839808,
  genre: "landscape",
  description: "mt wilson in the day 1",
  condition: ["windy"],
  transportation: ["walk,car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo106 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/plumas-national5.jpg",
  spotId: spot28._id,
  userId: users[4]._id,
  latitude: 39.969835,
  longitude: -120.839808,
  genre: "landscape",
  description: "mt wilson in the day 2",
  condition: ["windy"],
  transportation: ["walk,car"],
  bestTimeOfDay: "afternoon",
  payment: "0",
  likes: [],
});
let photo107 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sunflower.jpeg",
  spotId: spot45._id,
  userId: users[4]._id,
  latitude: 37.923488,
  longitude: -122.596606,
  genre: "street",
  description: "motorbike in the streets",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo108 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/noodles.jpeg",
  spotId: spot45._id,
  userId: users[2]._id,
  latitude: 37.923488,
  longitude: -122.596606,
  genre: "astro",
  description: "fireworks at mt wilson",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo109 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/hot-air-balloon.jpeg",
  spotId: spot45._id,
  userId: users[0]._id,
  latitude: 37.923488,
  longitude: -122.596606,
  genre: "aerial",
  description: "Aerial shot of LA",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo110 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tower-day.jpeg",
  spotId: spot40._id,
  userId: users[1]._id,
  latitude: 34.228933,
  longitude: -118.05687,
  genre: "street",
  description: "Hollywood series 4",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo111 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mt-wilson1.jpeg",
  spotId: spot40._id,
  userId: users[3]._id,
  latitude: 34.228933,
  longitude: -118.05687,
  genre: "street",
  description: "Hollywood series 3",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo112 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mt-wilson2.jpeg",
  spotId: spot40._id,
  userId: users[4]._id,
  latitude: 34.228933,
  longitude: -118.05687,
  genre: "street",
  description: "Hollywood series 2",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo113 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/motorbike.jpeg",
  spotId: spot40._id,
  userId: users[2]._id,
  latitude: 34.228933,
  longitude: -118.05687,
  genre: "street",
  description: "Hollywood series 1",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo114 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/fireworks.jpeg",
  spotId: spot40._id,
  userId: users[1]._id,
  latitude: 34.228933,
  longitude: -118.05687,
  genre: "wildlife",
  description: "racoon lazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo115 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/LA-aerial.jpeg",
  spotId: spot41._id,
  userId: users[3]._id,
  latitude: 34.089855,
  longitude: -118.328746,
  genre: "wildlife",
  description: "orange cow",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo116 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/hollywood4.jpeg",
  spotId: spot41._id,
  userId: users[4]._id,
  latitude: 34.089855,
  longitude: -118.328746,
  genre: "astro",
  description: "moon two thirds",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo117 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/hollywood3.jpeg",
  spotId: spot41._id,
  userId: users[4]._id,
  latitude: 34.089855,
  longitude: -118.328746,
  genre: "astro",
  description: "lightning lighting up the sky",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo118 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/hollywood2.jpeg",
  spotId: spot41._id,
  userId: users[2]._id,
  latitude: 34.089855,
  longitude: -118.328746,
  genre: "wildlife",
  description: "beautiful herons",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo119 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/hollywood1.jpeg",
  spotId: spot41._id,
  userId: users[0]._id,
  latitude: 34.089855,
  longitude: -118.328746,
  genre: "astro",
  description: "star trails behind a tree",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo120 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/racoon.jpeg",
  spotId: spot36._id,
  userId: users[1]._id,
  latitude: 40.782426,
  longitude: -120.177841,
  genre: "wildlife",
  description: "monkeys",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo121 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/orange-cow.jpeg",
  spotId: spot36._id,
  userId: users[3]._id,
  latitude: 40.782426,
  longitude: -120.177841,
  genre: "landscape",
  description: "fog trails over trees",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo122 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/moon-two-thirds.jpeg",
  spotId: spot36._id,
  userId: users[4]._id,
  latitude: 40.782426,
  longitude: -120.177841,
  genre: "wildlife",
  description: "flamingoes",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo123 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/lightning.jpeg",
  spotId: spot36._id,
  userId: users[2]._id,
  latitude: 40.782426,
  longitude: -120.177841,
  genre: "wildlife",
  description: "bumblebee",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo124 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/herons.jpeg",
  spotId: spot36._id,
  userId: users[1]._id,
  latitude: 40.782426,
  longitude: -120.177841,
  genre: "aerial",
  description: "smoke texture",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo125 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/star-trails.jpeg",
  spotId: spot37._id,
  userId: users[3]._id,
  latitude: 40.713375,
  longitude: -120.726933,
  genre: "landscape",
  description: "rear view mirror",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo126 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/monkeys.jpeg",
  spotId: spot37._id,
  userId: users[4]._id,
  latitude: 40.713375,
  longitude: -120.726933,
  genre: "street",
  description: "moody room",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo127 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/foggy-scene.jpeg",
  spotId: spot37._id,
  userId: users[4]._id,
  latitude: 40.713375,
  longitude: -120.726933,
  genre: "portrait",
  description: "pink flowers in a flower vase",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo128 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/flamingo.jpeg",
  spotId: spot37._id,
  userId: users[2]._id,
  latitude: 40.713375,
  longitude: -120.726933,
  genre: "street",
  description: "borgir",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo129 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bumble-bee.jpeg",
  spotId: spot37._id,
  userId: users[0]._id,
  latitude: 40.713375,
  longitude: -120.726933,
  genre: "aerial",
  description: "top down view of a pool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo130 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/smoke.jpeg",
  spotId: spot42._id,
  userId: users[1]._id,
  latitude: 37.228087,
  longitude: -119.50928,
  genre: "street",
  description: "panels on a building",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo131 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/rear-view.jpeg",
  spotId: spot42._id,
  userId: users[3]._id,
  latitude: 37.228087,
  longitude: -119.50928,
  genre: "portrait",
  description: "macro shot of a soap bubble",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo132 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/moody-room.jpeg",
  spotId: spot42._id,
  userId: users[4]._id,
  latitude: 37.228087,
  longitude: -119.50928,
  genre: "portrait",
  description: "hand underwater",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo133 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/flower-vase.jpeg",
  spotId: spot42._id,
  userId: users[2]._id,
  latitude: 37.228087,
  longitude: -119.50928,
  genre: "street",
  description: "coffee mug on a desk",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo134 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/borgir.jpeg",
  spotId: spot42._id,
  userId: users[1]._id,
  latitude: 37.228087,
  longitude: -119.50928,
  genre: "landscape",
  description: "Vibes",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo135 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pool-aerial.jpeg",
  spotId: spot43._id,
  userId: users[3]._id,
  latitude: 37.566885,
  longitude: -119.388153,
  genre: "landscape",
  description: "Great Place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo136 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/panels.jpeg",
  spotId: spot43._id,
  userId: users[4]._id,
  latitude: 37.566885,
  longitude: -119.388153,
  genre: "aerial",
  description: "Might move here",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo137 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/macro-colors.jpeg",
  spotId: spot43._id,
  userId: users[4]._id,
  latitude: 37.566885,
  longitude: -119.388153,
  genre: "landscape",
  description: "Must visit",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo138 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/hand-underwater.jpeg",
  spotId: spot43._id,
  userId: users[2]._id,
  latitude: 37.566885,
  longitude: -119.388153,
  genre: "landscape",
  description: "Great Vibes",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo139 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/coffee-on-desk.jpeg",
  spotId: spot43._id,
  userId: users[0]._id,
  latitude: 37.566885,
  longitude: -119.388153,
  genre: "landscape",
  description: "So cold here",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo140 = new Photo ({ url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sd-beaches1.jpg" , spotId: spot44._id ,userId: users[1]._id , latitude: 32.711074 ,longitude: -117.24223 ,genre: "landscape" , description : "Love it here" , condition: conditions.sampleTwo() , transportation: transportations.sampleTwo() , bestTimeOfDay: bestTimesOfDay.sample() , payment: payments.sample() , likes : []});

let photo141 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sd-beaches2.jpg",
  spotId: spot44._id,
  userId: users[3]._id,
  latitude: 32.711074,
  longitude: -117.24223,
  genre: "landscape",
  description: "Sf <3",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo142 = new Photo ({ url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sd-beaches3.jpg" , spotId: spot44._id ,userId: users[4]._id , latitude: 32.711074 ,longitude: -117.24223 ,genre: "landscape" , description : "Sf!!" , condition: conditions.sampleTwo() , transportation: transportations.sampleTwo() , bestTimeOfDay: bestTimesOfDay.sample() , payment: payments.sample() , likes : []});


let photo143 = new Photo ({ url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sd-beaches4.jpg" , spotId: spot44._id ,userId: users[2]._id , latitude: 32.711074 ,longitude: -117.24223 ,genre: "aerial" , description : "Love it here" , condition: conditions.sampleTwo() , transportation: transportations.sampleTwo() , bestTimeOfDay: bestTimesOfDay.sample() , payment: payments.sample() , likes : []});
let photo144 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sd-beaches5.jpg",
  spotId: spot44._id,
  userId: users[1]._id,
  latitude: 32.711074,
  longitude: -117.24223,
  genre: "landscape",
  description: "Sf <3",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo145 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sfspot1-1.jpg",
  spotId: spot1._id,
  userId: users[3]._id,
  latitude: 37.827419,
  longitude: -122.481477,
  genre: "landscape",
  description: "Sf!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo146 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sfspot1-2.jpg",
  spotId: spot1._id,
  userId: users[4]._id,
  latitude: 37.827419,
  longitude: -122.481477,
  genre: "landscape",
  description: "Peace",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo147 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sfspot1-3.jpg",
  spotId: spot1._id,
  userId: users[2]._id,
  latitude: 37.827419,
  longitude: -122.481477,
  genre: "landscape",
  description: "Nice here",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo148 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sfspot1-4.jpg",
  spotId: spot1._id,
  userId: users[1]._id,
  latitude: 37.827419,
  longitude: -122.481477,
  genre: "landscape",
  description: "Will come back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo149 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sfspot2-1.jpg",
  spotId: spot2._id,
  userId: users[3]._id,
  latitude: 37.79503,
  longitude: -122.403191,
  genre: "landscape",
  description: "Awesome place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo150 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sfspot2-2.jpg",
  spotId: spot2._id,
  userId: users[4]._id,
  latitude: 37.79503,
  longitude: -122.403191,
  genre: "landscape",
  description: "Great place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo151 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sfspot2-3.jpg",
  spotId: spot2._id,
  userId: users[2]._id,
  latitude: 37.79503,
  longitude: -122.403191,
  genre: "landscape",
  description: "Nice here",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo152 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/joaquin-1.jpg",
  spotId: spot47._id,
  userId: users[1]._id,
  latitude: 37.900526,
  longitude: -121.340871,
  genre: "landscape",
  description: "Will come back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo153 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/joaquin-2.jpg",
  spotId: spot47._id,
  userId: users[3]._id,
  latitude: 37.900526,
  longitude: -121.340871,
  genre: "landscape",
  description: "Awesome place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo154 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/joaquin-3.jpg",
  spotId: spot47._id,
  userId: users[4]._id,
  latitude: 37.900526,
  longitude: -121.340871,
  genre: "landscape",
  description: "Great place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo155 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/joaquin-4.jpg",
  spotId: spot47._id,
  userId: users[2]._id,
  latitude: 37.900526,
  longitude: -121.340871,
  genre: "landscape",
  description: "Windmill!!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo156 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/joaquin-5.jpg",
  spotId: spot47._id,
  userId: users[1]._id,
  latitude: 37.900526,
  longitude: -121.340871,
  genre: "portrait",
  description: "books",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo157 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/joaquin-peace1.jpg",
  spotId: spot48._id,
  userId: users[3]._id,
  latitude: 38.026121,
  longitude: -121.453481,
  genre: "landscape",
  description: "path through trees",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo158 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/joaquin-peace2.jpg",
  spotId: spot48._id,
  userId: users[4]._id,
  latitude: 38.026121,
  longitude: -121.453481,
  genre: "street",
  description: "staircase",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo159 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/joaquin-peace3.jpg",
  spotId: spot48._id,
  userId: users[2]._id,
  latitude: 38.026121,
  longitude: -121.453481,
  genre: "street",
  description: "roof of a church",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo160 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/joaquin-peace4.jpg",
  spotId: spot48._id,
  userId: users[4]._id,
  latitude: 38.026121,
  longitude: -121.453481,
  genre: "portrait",
  description: "designer glass",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo161 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/joaquin-peace5.jpg",
  spotId: spot48._id,
  userId: users[2]._id,
  latitude: 38.026121,
  longitude: -121.453481,
  genre: "street",
  description: "library corridor",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo162 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/book.jpeg",
  spotId: spot45._id,
  userId: users[1]._id,
  latitude: 37.923488,
  longitude: -122.596606,
  genre: "landscape",
  description: "landscape",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo163 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/trees-path.jpeg",
  spotId: spot46._id,
  userId: users[3]._id,
  latitude: 37.858748,
  longitude: -122.486561,
  genre: "street",
  description: "Great Place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo164 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/staircase.jpeg",
  spotId: spot46._id,
  userId: users[4]._id,
  latitude: 37.858748,
  longitude: -122.486561,
  genre: "street",
  description: "Might move here",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo165 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/roof.jpeg",
  spotId: spot46._id,
  userId: users[2]._id,
  latitude: 37.858748,
  longitude: -122.486561,
  genre: "landscape",
  description: "Must visit",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo166 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/glass-structure.jpeg",
  spotId: spot46._id,
  userId: users[0]._id,
  latitude: 37.858748,
  longitude: -122.486561,
  genre: "landscape",
  description: "Great Vibes",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo167 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/corridor.jpeg",
  spotId: spot46._id,
  userId: users[1]._id,
  latitude: 37.858748,
  longitude: -122.486561,
  genre: "landscape",
  description: "Great Place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo168 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/slo-1.jpg",
  spotId: spot49._id,
  userId: users[3]._id,
  latitude: 35.41932,
  longitude: -120.817598,
  genre: "landscape",
  description: "Might move here",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo169 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/slo-2.jpg",
  spotId: spot49._id,
  userId: users[4]._id,
  latitude: 35.41932,
  longitude: -120.817598,
  genre: "landscape",
  description: "Must visit",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo170 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/slo-3.jpg",
  spotId: spot49._id,
  userId: users[2]._id,
  latitude: 35.41932,
  longitude: -120.817598,
  genre: "landscape",
  description: "Great Vibes",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo171 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/slo-4.jpg",
  spotId: spot49._id,
  userId: users[4]._id,
  latitude: 35.41932,
  longitude: -120.817598,
  genre: "landscape",
  description: "Love this place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo172 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/slo-5.jpg",
  spotId: spot49._id,
  userId: users[2]._id,
  latitude: 35.41932,
  longitude: -120.817598,
  genre: "landscape",
  description: "Sun behind trees",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo173 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pismo1.jpg",
  spotId: spot50._id,
  userId: users[1]._id,
  latitude: 35.141296,
  longitude: -120.608858,
  genre: "landscape",
  description: "Trees in the snow",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo174 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pismo2.jpg",
  spotId: spot50._id,
  userId: users[3]._id,
  latitude: 35.141296,
  longitude: -120.608858,
  genre: "wildlife",
  description: "Moth",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo175 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pismo3.jpg",
  spotId: spot50._id,
  userId: users[4]._id,
  latitude: 35.141296,
  longitude: -120.608858,
  genre: "wildlife",
  description: "crow",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo176 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pismo4.jpg",
  spotId: spot50._id,
  userId: users[2]._id,
  latitude: 35.141296,
  longitude: -120.608858,
  genre: "landscape",
  description: "bridge",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo177 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pismo5.jpg",
  spotId: spot50._id,
  userId: users[0]._id,
  latitude: 35.141296,
  longitude: -120.608858,
  genre: "wildlife",
  description: "closeup of a horse",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo178 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sun-behind-trees.jpeg",
  spotId: spot51._id,
  userId: users[1]._id,
  latitude: 39.321517,
  longitude: -123.113379,
  genre: "wildlife",
  description: "elephant closeup",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo179 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/snowy-trees.jpeg",
  spotId: spot51._id,
  userId: users[3]._id,
  latitude: 39.321517,
  longitude: -123.113379,
  genre: "wildlife",
  description: "cow grazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo180 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/moth.jpeg",
  spotId: spot51._id,
  userId: users[4]._id,
  latitude: 39.321517,
  longitude: -123.113379,
  genre: "wildlife",
  description: "closeup of a cat",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo181 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/crow.jpeg",
  spotId: spot51._id,
  userId: users[2]._id,
  latitude: 39.321517,
  longitude: -123.113379,
  genre: "landscape",
  description: "cactii",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo182 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bridge.jpeg",
  spotId: spot51._id,
  userId: users[0]._id,
  latitude: 39.321517,
  longitude: -123.113379,
  genre: "street",
  description: "Cool Store",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo183 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/horse-closeup.jpeg",
  spotId: spot52._id,
  userId: users[1]._id,
  latitude: 39.437663,
  longitude: -123.383347,
  genre: "street",
  description: "Awesome Place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo184 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/elephant.jpeg",
  spotId: spot52._id,
  userId: users[3]._id,
  latitude: 39.437663,
  longitude: -123.383347,
  genre: "street",
  description: "Will come back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo185 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/cow.jpeg",
  spotId: spot52._id,
  userId: users[4]._id,
  latitude: 39.437663,
  longitude: -123.383347,
  genre: "street",
  description: "Great Vibes",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo186 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/catto.jpeg",
  spotId: spot52._id,
  userId: users[2]._id,
  latitude: 39.437663,
  longitude: -123.383347,
  genre: "landscape",
  description: "A Must Visit",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo187 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/cactii.jpeg",
  spotId: spot52._id,
  userId: users[0]._id,
  latitude: 39.437663,
  longitude: -123.383347,
  genre: "landscape",
  description: "Cool Store",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo188 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sanMateo1.jpg",
  spotId: spot6._id,
  userId: users[3]._id,
  latitude: 37.115196,
  longitude: -122.329892,
  genre: "wildlife",
  description: "Awesome Place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo189 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sanMateo2.jpg",
  spotId: spot6._id,
  userId: users[4]._id,
  latitude: 37.115196,
  longitude: -122.329892,
  genre: "wildlife",
  description: "Will come back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo190 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sanMateo3.jpg",
  spotId: spot6._id,
  userId: users[2]._id,
  latitude: 37.115196,
  longitude: -122.329892,
  genre: "wildlife",
  description: "Great Vibes",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo191 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sanMateo4.jpg",
  spotId: spot6._id,
  userId: users[1]._id,
  latitude: 37.115196,
  longitude: -122.329892,
  genre: "landscape",
  description: "wildfire",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo192 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/san-mateo1.jpg",
  spotId: spot53._id,
  userId: users[0]._id,
  latitude: 37.572572,
  longitude: -122.299496,
  genre: "landscape",
  description: "snowy woods",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo193 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/san-mateo2.jpg",
  spotId: spot53._id,
  userId: users[3]._id,
  latitude: 37.572572,
  longitude: -122.299496,
  genre: "astro",
  description: "star trails",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo194 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/san-mateo3.jpg",
  spotId: spot53._id,
  userId: users[4]._id,
  latitude: 37.572572,
  longitude: -122.299496,
  genre: "wildlife",
  description: "lizard on a twig",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo195 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/san-mateo4.jpg",
  spotId: spot53._id,
  userId: users[2]._id,
  latitude: 37.572572,
  longitude: -122.299496,
  genre: "landscape",
  description: "dandelion",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo196 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/san-mateo5.jpg",
  spotId: spot53._id,
  userId: users[1]._id,
  latitude: 37.572572,
  longitude: -122.299496,
  genre: "wildlife",
  description: "white wolf",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo197 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/wildfire.jpeg",
  spotId: spot54._id,
  userId: users[3]._id,
  latitude: 37.344716,
  longitude: -120.759048,
  genre: "aerial",
  description: "waves",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo198 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/snowy-woods.jpeg",
  spotId: spot54._id,
  userId: users[4]._id,
  latitude: 37.344716,
  longitude: -120.759048,
  genre: "landscape",
  description: "sunset behind trees",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo199 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/more-star-trails.jpeg",
  spotId: spot54._id,
  userId: users[2]._id,
  latitude: 37.344716,
  longitude: -120.759048,
  genre: "wildlife",
  description: "bald eagle",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo200 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/lizard.jpeg",
  spotId: spot54._id,
  userId: users[0]._id,
  latitude: 37.344716,
  longitude: -120.759048,
  genre: "landscape",
  description: "pink sky",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo201 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/dandelion.jpeg",
  spotId: spot54._id,
  userId: users[3]._id,
  latitude: 37.344716,
  longitude: -120.759048,
  genre: "aerial",
  description: "Wow great place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo202 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/white-wolf.jpeg",
  spotId: spot55._id,
  userId: users[1]._id,
  latitude: 36.991604,
  longitude: -120.927242,
  genre: "aerial",
  description: "Amazing Weather",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo203 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/waves.jpeg",
  spotId: spot55._id,
  userId: users[4]._id,
  latitude: 36.991604,
  longitude: -120.927242,
  genre: "aerial",
  description: "Must comeback",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo204 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sunset-behind-trees.jpeg",
  spotId: spot55._id,
  userId: users[2]._id,
  latitude: 36.991604,
  longitude: -120.927242,
  genre: "aerial",
  description: "I going to move here",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo205 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bald-eagle.jpeg",
  spotId: spot55._id,
  userId: users[0]._id,
  latitude: 36.991604,
  longitude: -120.927242,
  genre: "aerial",
  description: "Must visit",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo206 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pink-sky.jpeg",
  spotId: spot55._id,
  userId: users[3]._id,
  latitude: 36.991604,
  longitude: -120.927242,
  genre: "landscape",
  description: "Best College Town",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo207 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sb1.jpg",
  spotId: spot56._id,
  userId: users[4]._id,
  latitude: 34.399027,
  longitude: -119.708524,
  genre: "landscape",
  description: "Cannot I live here",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo208 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sb2.jpg",
  spotId: spot56._id,
  userId: users[2]._id,
  latitude: 34.399027,
  longitude: -119.708524,
  genre: "landscape",
  description: "Nice place to relax",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo209 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sb3.jpg",
  spotId: spot56._id,
  userId: users[1]._id,
  latitude: 34.399027,
  longitude: -119.708524,
  genre: "landscape",
  description: "Love it here",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo210 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sb4.jpg",
  spotId: spot56._id,
  userId: users[3]._id,
  latitude: 34.399027,
  longitude: -119.708524,
  genre: "landscape",
  description: "Must visit",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo211 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sb5.jpg",
  spotId: spot56._id,
  userId: users[4]._id,
  latitude: 34.399027,
  longitude: -119.708524,
  genre: "landscape",
  description: "an array of trees",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo212 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/iv1.jpg",
  spotId: spot57._id,
  userId: users[2]._id,
  latitude: 34.412027,
  longitude: -119.841432,
  genre: "landscape",
  description: "sand patterns",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo213 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/iv2.jpg",
  spotId: spot57._id,
  userId: users[0]._id,
  latitude: 34.412027,
  longitude: -119.841432,
  genre: "landscape",
  description: "pink flowers",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo214 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/iv3.jpg",
  spotId: spot57._id,
  userId: users[4]._id,
  latitude: 34.412027,
  longitude: -119.841432,
  genre: "astro",
  description: "full moon",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo215 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/iv4.jpg",
  spotId: spot57._id,
  userId: users[2]._id,
  latitude: 34.412027,
  longitude: -119.841432,
  genre: "wildlife",
  description: "a herd of deer",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo216 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/iv5.jpg",
  spotId: spot57._id,
  userId: users[1]._id,
  latitude: 34.412027,
  longitude: -119.841432,
  genre: "wildlife",
  description: "squirrel",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo217 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tree-array.jpeg",
  spotId: spot61._id,
  userId: users[3]._id,
  latitude: 41.407531,
  longitude: -120.678232,
  genre: "wildlife",
  description: "parrot",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo218 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sand-texture.jpeg",
  spotId: spot61._id,
  userId: users[4]._id,
  latitude: 41.407531,
  longitude: -120.678232,
  genre: "wildlife",
  description: "hyena",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo219 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pink-flowers.jpeg",
  spotId: spot61._id,
  userId: users[2]._id,
  latitude: 41.407531,
  longitude: -120.678232,
  genre: "wildlife",
  description: "doggo on da beach",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo220 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/full-moon.jpeg",
  spotId: spot61._id,
  userId: users[0]._id,
  latitude: 41.407531,
  longitude: -120.678232,
  genre: "wildlife",
  description: "doggo in da grass",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo221 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/deer.jpeg",
  spotId: spot61._id,
  userId: users[1]._id,
  latitude: 41.407531,
  longitude: -120.678232,
  genre: "landscape",
  description: "flower",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo222 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/squirrel.jpeg",
  spotId: spot62._id,
  userId: users[3]._id,
  latitude: 41.834889,
  longitude: -120.359977,
  genre: "landscape",
  description: "Mountain",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo223 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/parrot.jpeg",
  spotId: spot62._id,
  userId: users[4]._id,
  latitude: 41.834889,
  longitude: -120.359977,
  genre: "landscape",
  description: "Livermore is great",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo224 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/hyena.jpeg",
  spotId: spot62._id,
  userId: users[2]._id,
  latitude: 41.834889,
  longitude: -120.359977,
  genre: "landscape",
  description: "Must Visit",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo225 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/doggo-on-beach.jpeg",
  spotId: spot62._id,
  userId: users[0]._id,
  latitude: 41.834889,
  longitude: -120.359977,
  genre: "landscape",
  description: "Great Place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo226 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/doggo-in-grass.jpeg",
  spotId: spot62._id,
  userId: users[1]._id,
  latitude: 41.834889,
  longitude: -120.359977,
  genre: "wildlife",
  description: "doggo in da grass",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo227 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/livermore-flower.jpg",
  spotId: spot63._id,
  userId: users[1]._id,
  latitude: 37.689194,
  longitude: -121.786609,
  genre: "aerial",
  description: "Amazing place",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo228 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/livermore-mountain.jpg",
  spotId: spot63._id,
  userId: users[1]._id,
  latitude: 37.689194,
  longitude: -121.786609,
  genre: "landscape",
  description: "Great Skys",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo229 = new Photo ({ url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/livermore-sunset.jpg" , spotId: spot63._id ,userId: users[1]._id , latitude: 37.689194 ,longitude: -121.786609 ,genre: "landscape" , description : "Great Game" , condition: conditions.sampleTwo() , transportation: transportations.sampleTwo() , bestTimeOfDay: bestTimesOfDay.sample() , payment: payments.sample() , likes : []});

let photo230 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/livermore-trail.jpg",
  spotId: spot63._id,
  userId: users[2]._id,
  latitude: 37.689194,
  longitude: -121.786609,
  genre: "landscape",
  description: "Fun Rides",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo231 = new Photo ({ url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/livermore-tree.jpg" , spotId: spot63._id ,userId: users[2]._id , latitude: 37.689194 ,longitude: -121.786609 ,genre: "landscape" , description : "Must visit" , condition: conditions.sampleTwo() , transportation: transportations.sampleTwo() , bestTimeOfDay: bestTimesOfDay.sample() , payment: payments.sample() , likes : []});	let photo232 = new Photo ({ url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santa-clara1.jpg" , spotId: spot58._id ,userId: users[0]._id , latitude: 37.387841 ,longitude: -121.974078 ,genre: "wildlife" , description : "Silly Dog" , condition: conditions.sampleTwo() , transportation: transportations.sampleTwo() , bestTimeOfDay: bestTimesOfDay.sample() , payment: payments.sample() , likes : []});

let photo233 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santa-clara2.jpg",
  spotId: spot58._id,
  userId: users[1]._id,
  latitude: 37.387841,
  longitude: -121.974078,
  genre: "wildlife",
  description: "Doge",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo234 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santa-clara3.jpg",
  spotId: spot58._id,
  userId: users[3]._id,
  latitude: 37.387841,
  longitude: -121.974078,
  genre: "landscape",
  description: "Flower",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo235 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santa-clara4.jpg",
  spotId: spot58._id,
  userId: users[4]._id,
  latitude: 37.387841,
  longitude: -121.974078,
  genre: "wildlife",
  description: "Not in the mood",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo236 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santa-clara5.jpg",
  spotId: spot58._id,
  userId: users[2]._id,
  latitude: 37.387841,
  longitude: -121.974078,
  genre: "landscape",
  description: "bay bridge views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo237 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santa-clara6.jpg",
  spotId: spot59._id,
  userId: users[2]._id,
  latitude: 37.404751,
  longitude: -121.981288,
  genre: "landscape",
  description: "boat in oakland",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo238 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santa-clara7.jpg",
  spotId: spot59._id,
  userId: users[2]._id,
  latitude: 37.404751,
  longitude: -121.981288,
  genre: "landscape",
  description: "lake merritt",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo239 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santa-clara8.jpg",
  spotId: spot59._id,
  userId: users[2]._id,
  latitude: 37.404751,
  longitude: -121.981288,
  genre: "landscape",
  description: "bay bridge views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo240 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santa-clara9.jpg",
  spotId: spot59._id,
  userId: users[2]._id,
  latitude: 37.404751,
  longitude: -121.981288,
  genre: "landscape",
  description: "boat in oakland",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo241 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santa-clara10.jpg",
  spotId: spot59._id,
  userId: users[2]._id,
  latitude: 37.404751,
  longitude: -121.981288,
  genre: "wildlife",
  description: "Not in the mood",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo242 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/oakland-bay-bridge.jpg",
  spotId: spot64._id,
  userId: users[0]._id,
  latitude: 37.803701,
  longitude: -122.252016,
  genre: "landscape",
  description: "bay bridge views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo243 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/oakland-boat.jpg",
  spotId: spot64._id,
  userId: users[2]._id,
  latitude: 37.803701,
  longitude: -122.252016,
  genre: "landscape",
  description: "boat in oakland",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo244 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/oakland-lake-merrit.jpg",
  spotId: spot64._id,
  userId: users[1]._id,
  latitude: 37.803701,
  longitude: -122.252016,
  genre: "landscape",
  description: "lake merritt",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo245 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/oakland-skyline.jpg",
  spotId: spot64._id,
  userId: users[0]._id,
  latitude: 37.803701,
  longitude: -122.252016,
  genre: "landscape",
  description: "oakland skyline",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo246 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/oakland-sunset.jpg",
  spotId: spot64._id,
  userId: users[0]._id,
  latitude: 37.803701,
  longitude: -122.252016,
  genre: "landscape",
  description: "oakland sunset",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo247 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/alpine-1.jpg",
  spotId: spot69._id,
  userId: users[0]._id,
  latitude: 38.710719,
  longitude: -119.875844,
  genre: "landscape",
  description: "alpine mountains",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo248 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/alpine-2.jpg",
  spotId: spot69._id,
  userId: users[0]._id,
  latitude: 38.710719,
  longitude: -119.875844,
  genre: "landscape",
  description: "alpine mountains",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo249 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/alpine-3.jpg",
  spotId: spot69._id,
  userId: users[0]._id,
  latitude: 38.710719,
  longitude: -119.875844,
  genre: "landscape",
  description: "alpine mountains",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo250 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/alpine-4.jpg",
  spotId: spot69._id,
  userId: users[0]._id,
  latitude: 38.710719,
  longitude: -119.875844,
  genre: "landscape",
  description: "alpine mountains",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo251 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/alpine-5.jpg",
  spotId: spot69._id,
  userId: users[0]._id,
  latitude: 38.710719,
  longitude: -119.875844,
  genre: "landscape",
  description: "alpine mountains",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo254 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bear-valley-1.jpg",
  spotId: spot70._id,
  userId: users[1]._id,
  latitude: 38.47673,
  longitude: -120.048878,
  genre: "landscape",
  description: "alpine mountains",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo255 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bear-valley-2.jpg",
  spotId: spot70._id,
  userId: users[1]._id,
  latitude: 38.47673,
  longitude: -120.048878,
  genre: "landscape",
  description: "alpine mountains",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo256 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bear-valley-3.jpg",
  spotId: spot70._id,
  userId: users[0]._id,
  latitude: 38.47673,
  longitude: -120.048878,
  genre: "landscape",
  description: "alpine mountains",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo257 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bear-valley-4.jpg",
  spotId: spot70._id,
  userId: users[2]._id,
  latitude: 38.47673,
  longitude: -120.048878,
  genre: "landscape",
  description: "alpine mountains",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo258 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bear-valley-5.jpg",
  spotId: spot70._id,
  userId: users[3]._id,
  latitude: 38.47673,
  longitude: -120.048878,
  genre: "landscape",
  description: "alpine mountains",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo259 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/kirkwood-1.jpg",
  spotId: spot73._id,
  userId: users[3]._id,
  latitude: 38.688584,
  longitude: -120.063063,
  genre: "landscape",
  description: "kirkwood lake",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo260 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/kirkwood-2.jpg",
  spotId: spot73._id,
  userId: users[3]._id,
  latitude: 38.688584,
  longitude: -120.063063,
  genre: "landscape",
  description: "kirkwood night",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo261 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/kirkwood-3.jpg",
  spotId: spot73._id,
  userId: users[3]._id,
  latitude: 38.688584,
  longitude: -120.063063,
  genre: "landscape",
  description: "kirkwood sunset",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo262 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/kirkwood-4.jpg",
  spotId: spot73._id,
  userId: users[3]._id,
  latitude: 38.688584,
  longitude: -120.063063,
  genre: "landscape",
  description: "kirkwood snowy mountain",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo263 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/kirkwood-5.jpg",
  spotId: spot73._id,
  userId: users[3]._id,
  latitude: 38.688584,
  longitude: -120.063063,
  genre: "landscape",
  description: "kirkwood trees",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo264 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pine-grove-1.jpg",
  spotId: spot74._id,
  userId: users[3]._id,
  latitude: 38.688584,
  longitude: -120.063063,
  genre: "landscape",
  description: "pine grove",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo265 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pine-grove-2.jpg",
  spotId: spot74._id,
  userId: users[3]._id,
  latitude: 38.688584,
  longitude: -120.063063,
  genre: "landscape",
  description: "snowy",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo266 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pine-grove-2.jpg",
  spotId: spot74._id,
  userId: users[3]._id,
  latitude: 38.688584,
  longitude: -120.063063,
  genre: "landscape",
  description: "tree grove",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo267 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pine-grove-3.jpg",
  spotId: spot74._id,
  userId: users[3]._id,
  latitude: 38.688584,
  longitude: -120.063063,
  genre: "landscape",
  description: "sunshine grove",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo268 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pine-grove-4.jpg",
  spotId: spot74._id,
  userId: users[3]._id,
  latitude: 38.688584,
  longitude: -120.063063,
  genre: "landscape",
  description: "pine grove",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo269 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pine-grove-5.jpg",
  spotId: spot74._id,
  userId: users[3]._id,
  latitude: 38.688584,
  longitude: -120.063063,
  genre: "landscape",
  description: "skyline grove",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo270 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mono1.jpeg",
  spotId: spot65._id,
  userId: users[2]._id,
  latitude: 38.030007,
  longitude: -119.062793,
  genre: "landscape",
  description: "mono lake 1",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo271 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mono2.jpeg",
  spotId: spot65._id,
  userId: users[0]._id,
  latitude: 38.030007,
  longitude: -119.062793,
  genre: "landscape",
  description: "mono lake 2",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo272 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mono3.jpeg",
  spotId: spot65._id,
  userId: users[1]._id,
  latitude: 38.030007,
  longitude: -119.062793,
  genre: "landscape",
  description: "mono lake 3",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo273 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mono4.jpeg",
  spotId: spot65._id,
  userId: users[3]._id,
  latitude: 38.030007,
  longitude: -119.062793,
  genre: "landscape",
  description: "mono lake 4",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo274 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mono5.jpeg",
  spotId: spot65._id,
  userId: users[4]._id,
  latitude: 38.030007,
  longitude: -119.062793,
  genre: "landscape",
  description: "mono lake 5",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo275 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mono6.jpeg",
  spotId: spot66._id,
  userId: users[2]._id,
  latitude: 37.998852,
  longitude: -119.039481,
  genre: "landscape",
  description: "mono lake 6",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo276 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mono7.jpeg",
  spotId: spot66._id,
  userId: users[0]._id,
  latitude: 37.998852,
  longitude: -119.039481,
  genre: "landscape",
  description: "mono lake 7",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo277 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mono8.jpeg",
  spotId: spot66._id,
  userId: users[1]._id,
  latitude: 37.998852,
  longitude: -119.039481,
  genre: "landscape",
  description: "mono lake 8",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo278 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mono9.jpeg",
  spotId: spot66._id,
  userId: users[3]._id,
  latitude: 37.998852,
  longitude: -119.039481,
  genre: "landscape",
  description: "mono lake 9",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo279 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mono10.jpeg",
  spotId: spot66._id,
  userId: users[4]._id,
  latitude: 37.998852,
  longitude: -119.039481,
  genre: "landscape",
  description: "mono lake 10",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo280 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/cypress-tree.jpeg",
  spotId: spot67._id,
  userId: users[2]._id,
  latitude: 36.602608,
  longitude: -121.893618,
  genre: "landscape",
  description: "lone cypress tree",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo281 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/cypress-tree-2.jpeg",
  spotId: spot67._id,
  userId: users[0]._id,
  latitude: 36.602608,
  longitude: -121.893618,
  genre: "landscape",
  description: "lone cypress tree 2",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo282 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bixby-bridge.jpeg",
  spotId: spot67._id,
  userId: users[1]._id,
  latitude: 36.602608,
  longitude: -121.893618,
  genre: "landscape",
  description: "bixby bridge 1",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo283 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bixby-alternate.jpeg",
  spotId: spot67._id,
  userId: users[3]._id,
  latitude: 36.602608,
  longitude: -121.893618,
  genre: "landscape",
  description: "bixby bridge 2",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo284 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/jellyfish.jpeg",
  spotId: spot67._id,
  userId: users[4]._id,
  latitude: 36.602608,
  longitude: -121.893618,
  genre: "wildlife",
  description: "jellyfish",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo285 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/carmel-4.jpeg",
  spotId: spot68._id,
  userId: users[2]._id,
  latitude: 36.554865,
  longitude: -121.930363,
  genre: "aerial",
  description: "top down carmel beach",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo286 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/carmel-1.jpeg",
  spotId: spot68._id,
  userId: users[0]._id,
  latitude: 36.554865,
  longitude: -121.930363,
  genre: "landscape",
  description: "carmel 1",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo287 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/carmel-2.jpeg",
  spotId: spot68._id,
  userId: users[1]._id,
  latitude: 36.554865,
  longitude: -121.930363,
  genre: "landscape",
  description: "carmel 2",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo288 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/carmel-3.jpeg",
  spotId: spot68._id,
  userId: users[3]._id,
  latitude: 36.554865,
  longitude: -121.930363,
  genre: "landscape",
  description: "carmel 3",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo289 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/carmel-5.jpeg",
  spotId: spot68._id,
  userId: users[4]._id,
  latitude: 36.554865,
  longitude: -121.930363,
  genre: "landscape",
  description: "carmel 4",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo290 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mariposa1.jpg",
  spotId: spot60._id,
  userId: users[2]._id,
  latitude: 37.486624,
  longitude: -119.970754,
  genre: "wildlife",
  description: "Butterfly",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo291 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mariposa2.jpg",
  spotId: spot60._id,
  userId: users[0]._id,
  latitude: 37.486624,
  longitude: -119.970754,
  genre: "wildlife",
  description: "Pretty Butterfly",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo292 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mariposa3.jpg",
  spotId: spot60._id,
  userId: users[1]._id,
  latitude: 37.486624,
  longitude: -119.970754,
  genre: "wildlife",
  description: "ButterflyxFlower",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo293 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mariposa4.jpg",
  spotId: spot60._id,
  userId: users[3]._id,
  latitude: 37.486624,
  longitude: -119.970754,
  genre: "wildlife",
  description: "Love it here",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo294 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mariposa5.jpg",
  spotId: spot60._id,
  userId: users[4]._id,
  latitude: 37.486624,
  longitude: -119.970754,
  genre: "wildlife",
  description: "Must visit",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo300 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/napa3.jpeg",
  spotId: spot71._id,
  userId: users[2]._id,
  latitude: 38.298678,
  longitude: -122.278738,
  genre: "aerial",
  description: "napa hot air balloon",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo301 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/napa1.jpeg",
  spotId: spot71._id,
  userId: users[0]._id,
  latitude: 38.298678,
  longitude: -122.278738,
  genre: "landscape",
  description: "napa hot air balloon 2",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo302 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/napa2.jpeg",
  spotId: spot71._id,
  userId: users[1]._id,
  latitude: 38.298678,
  longitude: -122.278738,
  genre: "landscape",
  description: "barrels of wine",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo303 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/napa4.jpeg",
  spotId: spot71._id,
  userId: users[3]._id,
  latitude: 38.298678,
  longitude: -122.278738,
  genre: "landscape",
  description: "winery",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo304 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/napa5.jpeg",
  spotId: spot71._id,
  userId: users[4]._id,
  latitude: 38.298678,
  longitude: -122.278738,
  genre: "landscape",
  description: "statue",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo305 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/zinfandel1.jpeg",
  spotId: spot72._id,
  userId: users[2]._id,
  latitude: 38.482861,
  longitude: -122.446171,
  genre: "landscape",
  description: "zinfandel 1",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo306 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/zinfandel2.jpeg",
  spotId: spot72._id,
  userId: users[0]._id,
  latitude: 38.482861,
  longitude: -122.446171,
  genre: "landscape",
  description: "zinfandel 2",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo307 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/zinfandel3.jpeg",
  spotId: spot72._id,
  userId: users[1]._id,
  latitude: 38.482861,
  longitude: -122.446171,
  genre: "landscape",
  description: "zinfandel 3",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo308 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/zinfandel4.jpeg",
  spotId: spot72._id,
  userId: users[3]._id,
  latitude: 38.482861,
  longitude: -122.446171,
  genre: "landscape",
  description: "zinfandel 4",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo309 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/zinfandel5.jpeg",
  spotId: spot72._id,
  userId: users[4]._id,
  latitude: 38.482861,
  longitude: -122.446171,
  genre: "landscape",
  description: "zinfandel 5",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo310 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tahoe1.jpeg",
  spotId: spot75._id,
  userId: users[2]._id,
  latitude: 39.405707,
  longitude: -120.55694,
  genre: "landscape",
  description: "tahoe forest 1",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo311 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tahoe2.jpeg",
  spotId: spot75._id,
  userId: users[0]._id,
  latitude: 39.405707,
  longitude: -120.55694,
  genre: "landscape",
  description: "tahoe forest 2",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo312 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tahoe3.jpeg",
  spotId: spot75._id,
  userId: users[1]._id,
  latitude: 39.405707,
  longitude: -120.55694,
  genre: "landscape",
  description: "tahoe forest 3",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo313 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tahoe4.jpeg",
  spotId: spot75._id,
  userId: users[3]._id,
  latitude: 39.405707,
  longitude: -120.55694,
  genre: "landscape",
  description: "tahoe forest 4",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo314 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/dog-at-tahoe.jpeg",
  spotId: spot75._id,
  userId: users[4]._id,
  latitude: 39.405707,
  longitude: -120.55694,
  genre: "portrait",
  description: "doggo at Tahoe",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo315 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/lake1.jpeg",
  spotId: spot76._id,
  userId: users[2]._id,
  latitude: 39.23665,
  longitude: -121.209485,
  genre: "landscape",
  description: "lake wildwood 1",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo316 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/lake2.jpeg",
  spotId: spot76._id,
  userId: users[0]._id,
  latitude: 39.23665,
  longitude: -121.209485,
  genre: "landscape",
  description: "lake wildwood 2",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo317 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/lake3.jpeg",
  spotId: spot76._id,
  userId: users[1]._id,
  latitude: 39.23665,
  longitude: -121.209485,
  genre: "landscape",
  description: "lake wildwood 3",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo318 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/lake-4.jpeg",
  spotId: spot76._id,
  userId: users[3]._id,
  latitude: 39.23665,
  longitude: -121.209485,
  genre: "landscape",
  description: "lake wildwood 4",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo319 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/lake-astro.jpeg",
  spotId: spot76._id,
  userId: users[4]._id,
  latitude: 39.23665,
  longitude: -121.209485,
  genre: "astro",
  description: "lake wildwood 5",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo320 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santacruz1.jpg",
  spotId: spot78._id,
  userId: users[4]._id,
  latitude: 37.071128,
  longitude: -121.986529,
  genre: "landscape",
  description: "Beautiful day on the Boardwalk",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo321 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santacruz2.jpg",
  spotId: spot78._id,
  userId: users[4]._id,
  latitude: 37.071128,
  longitude: -121.986529,
  genre: "landscape",
  description: "I love this picture",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo322 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santacruz3.jpg",
  spotId: spot78._id,
  userId: users[4]._id,
  latitude: 37.071128,
  longitude: -121.986529,
  genre: "landscape",
  description: "It is so cute",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo323 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santacruz4.jpg",
  spotId: spot78._id,
  userId: users[4]._id,
  latitude: 37.071128,
  longitude: -121.986529,
  genre: "landscape",
  description: "Can't wait to come back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo324 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santacruz5.jpg",
  spotId: spot78._id,
  userId: users[4]._id,
  latitude: 37.071128,
  longitude: -121.986529,
  genre: "landscape",
  description: "Gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo325 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santacruz6.jpg",
  spotId: spot9._id,
  userId: users[2]._id,
  latitude: 36.963911,
  longitude: -122.019289,
  genre: "landscape",
  description: "beautiful",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo326 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santacruz7.jpg",
  spotId: spot9._id,
  userId: users[0]._id,
  latitude: 36.963911,
  longitude: -122.019289,
  genre: "landscape",
  description: "I love santa cruz",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo327 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santacruz8.jpg",
  spotId: spot9._id,
  userId: users[1]._id,
  latitude: 36.963911,
  longitude: -122.019289,
  genre: "landscape",
  description: "So gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo328 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santacruz9.jpg",
  spotId: spot9._id,
  userId: users[3]._id,
  latitude: 36.963911,
  longitude: -122.019289,
  genre: "landscape",
  description: "A beautiful day",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo329 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/santacruz10.jpg",
  spotId: spot9._id,
  userId: users[4]._id,
  latitude: 36.963911,
  longitude: -122.019289,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo330 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/butte-1.jpg",
  spotId: spot79._id,
  userId: users[2]._id,
  latitude: 39.532079,
  longitude: -121.776494,
  genre: "landscape",
  description: "beautiful forest",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo331 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/butte-2.jpg",
  spotId: spot79._id,
  userId: users[0]._id,
  latitude: 39.532079,
  longitude: -121.776494,
  genre: "landscape",
  description: "forest",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo332 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/butte-3.jpg",
  spotId: spot79._id,
  userId: users[1]._id,
  latitude: 39.532079,
  longitude: -121.776494,
  genre: "landscape",
  description: "beautiful tree",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo333 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/butte-4.jpg",
  spotId: spot79._id,
  userId: users[3]._id,
  latitude: 39.532079,
  longitude: -121.776494,
  genre: "landscape",
  description: "orange forest",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo334 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/butte-5.jpg",
  spotId: spot79._id,
  userId: users[4]._id,
  latitude: 39.532079,
  longitude: -121.776494,
  genre: "landscape",
  description: "light in the forest",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo335 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/oroville-1.jpg",
  spotId: spot80._id,
  userId: users[2]._id,
  latitude: 39.507696,
  longitude: -121.54873,
  genre: "landscape",
  description: "lake views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo336 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/oroville-2.jpg",
  spotId: spot80._id,
  userId: users[1]._id,
  latitude: 39.507696,
  longitude: -121.54873,
  genre: "landscape",
  description: "green views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo337 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/oroville-3.jpg",
  spotId: spot80._id,
  userId: users[1]._id,
  latitude: 39.507696,
  longitude: -121.54873,
  genre: "landscape",
  description: "green views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo338 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/oroville-4.jpg",
  spotId: spot80._id,
  userId: users[1]._id,
  latitude: 39.507696,
  longitude: -121.54873,
  genre: "landscape",
  description: "green views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo339 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/oroville-5.jpg",
  spotId: spot80._id,
  userId: users[1]._id,
  latitude: 39.507696,
  longitude: -121.54873,
  genre: "landscape",
  description: "green views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo340 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/silverado1.jpeg",
  spotId: spot77._id,
  userId: users[2]._id,
  latitude: 33.769148,
  longitude: -117.701465,
  genre: "landscape",
  description: "silverado trail",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo341 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/silverado2.jpeg",
  spotId: spot77._id,
  userId: users[0]._id,
  latitude: 33.769148,
  longitude: -117.701465,
  genre: "street",
  description: "silverado house",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo342 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/silverado3.jpeg",
  spotId: spot77._id,
  userId: users[1]._id,
  latitude: 33.769148,
  longitude: -117.701465,
  genre: "wildlife",
  description: "peacock at silverado",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo343 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/silverado4.jpeg",
  spotId: spot77._id,
  userId: users[3]._id,
  latitude: 33.769148,
  longitude: -117.701465,
  genre: "landscape",
  description: "silverado postbox",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo344 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/silverado5.jpeg",
  spotId: spot77._id,
  userId: users[4]._id,
  latitude: 33.769148,
  longitude: -117.701465,
  genre: "landscape",
  description: "grapes at silverado",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo345 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/cdm1.jpeg",
  spotId: spot81._id,
  userId: users[2]._id,
  latitude: 33.593696,
  longitude: -117.876092,
  genre: "landscape",
  description: "corona del mar beach 1",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo346 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/cdm2.jpeg",
  spotId: spot81._id,
  userId: users[0]._id,
  latitude: 33.593696,
  longitude: -117.876092,
  genre: "landscape",
  description: "corona del mar beach 2",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo347 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/cdm3.jpeg",
  spotId: spot81._id,
  userId: users[1]._id,
  latitude: 33.593696,
  longitude: -117.876092,
  genre: "landscape",
  description: "corona del mar beach 3",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo348 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/cdm4.jpeg",
  spotId: spot81._id,
  userId: users[3]._id,
  latitude: 33.593696,
  longitude: -117.876092,
  genre: "landscape",
  description: "corona del mar beach 4",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo349 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/cdm5.jpeg",
  spotId: spot81._id,
  userId: users[4]._id,
  latitude: 33.593696,
  longitude: -117.876092,
  genre: "landscape",
  description: "corona del mar beach 5",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo350 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/dollarpt1.jpeg",
  spotId: spot84._id,
  userId: users[2]._id,
  latitude: 39.186336,
  longitude: -120.095212,
  genre: "landscape",
  description: "dollar point 1",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo351 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/dollarpt2.jpeg",
  spotId: spot84._id,
  userId: users[0]._id,
  latitude: 39.186336,
  longitude: -120.095212,
  genre: "landscape",
  description: "dollar point 2",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo352 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/dollarpt3.jpeg",
  spotId: spot84._id,
  userId: users[1]._id,
  latitude: 39.186336,
  longitude: -120.095212,
  genre: "landscape",
  description: "dollar point 3",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo353 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/dollarpt4.jpeg",
  spotId: spot84._id,
  userId: users[3]._id,
  latitude: 39.186336,
  longitude: -120.095212,
  genre: "landscape",
  description: "dollar point 4",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo354 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/dollarpt5.jpeg",
  spotId: spot84._id,
  userId: users[4]._id,
  latitude: 39.186336,
  longitude: -120.095212,
  genre: "landscape",
  description: "dollar point 5",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo355 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/granitebay1.jpeg",
  spotId: spot85._id,
  userId: users[2]._id,
  latitude: 38.761631,
  longitude: -121.165135,
  genre: "landscape",
  description: "granite bay 1",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo356 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/granitebay2.jpeg",
  spotId: spot85._id,
  userId: users[0]._id,
  latitude: 38.761631,
  longitude: -121.165135,
  genre: "landscape",
  description: "granite bay 2",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo357 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/granitebay3.jpeg",
  spotId: spot85._id,
  userId: users[1]._id,
  latitude: 38.761631,
  longitude: -121.165135,
  genre: "landscape",
  description: "granite bay 3",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo358 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/granitebay4.jpeg",
  spotId: spot85._id,
  userId: users[3]._id,
  latitude: 38.761631,
  longitude: -121.165135,
  genre: "landscape",
  description: "granite bay 4",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo359 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/granitebay5.jpeg",
  spotId: spot85._id,
  userId: users[4]._id,
  latitude: 38.761631,
  longitude: -121.165135,
  genre: "landscape",
  description: "granite bay 5",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo360 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/arnold-1.jpg",
  spotId: spot112._id,
  userId: users[0]._id,
  latitude: 38.256113,
  longitude: -120.359558,
  genre: "landscape",
  description: "arnold green hills",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo361 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/arnold-2.jpg",
  spotId: spot112._id,
  userId: users[1]._id,
  latitude: 38.256113,
  longitude: -120.359558,
  genre: "landscape",
  description: "arnold trails",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo362 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/arnold-3.jpg",
  spotId: spot112._id,
  userId: users[1]._id,
  latitude: 38.256113,
  longitude: -120.359558,
  genre: "landscape",
  description: "arnold trail",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo363 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/arnold-4.jpg",
  spotId: spot112._id,
  userId: users[1]._id,
  latitude: 38.256113,
  longitude: -120.359558,
  genre: "landscape",
  description: "running gal",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo364 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/arnold-5.jpg",
  spotId: spot112._id,
  userId: users[1]._id,
  latitude: 38.256113,
  longitude: -120.359558,
  genre: "landscape",
  description: "arnold sunset",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo365 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/murphys-1.jpg",
  spotId: spot113._id,
  userId: users[2]._id,
  latitude: 38.153867,
  longitude: -120.383755,
  genre: "landscape",
  description: "greenery",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo366 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/murphys-2.jpg",
  spotId: spot113._id,
  userId: users[0]._id,
  latitude: 38.153867,
  longitude: -120.383755,
  genre: "landscape",
  description: "green hikes",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo367 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/murphys-3.jpg",
  spotId: spot113._id,
  userId: users[1]._id,
  latitude: 38.153867,
  longitude: -120.383755,
  genre: "landscape",
  description: "camping views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo368 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/murphys-4.jpg",
  spotId: spot113._id,
  userId: users[2]._id,
  latitude: 38.153867,
  longitude: -120.383755,
  genre: "landscape",
  description: "lake scene",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo369 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/murphys-5.jpg",
  spotId: spot113._id,
  userId: users[2]._id,
  latitude: 38.153867,
  longitude: -120.383755,
  genre: "landscape",
  description: "bridge",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo370 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sites-1.jpg",
  spotId: spot114._id,
  userId: users[2]._id,
  latitude: 39.308641,
  longitude: -122.341854,
  genre: "landscape",
  description: "golden hour trees",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo371 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sites-2.jpg",
  spotId: spot114._id,
  userId: users[2]._id,
  latitude: 39.308641,
  longitude: -122.341854,
  genre: "landscape",
  description: "light",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo372 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sites-3.jpg",
  spotId: spot114._id,
  userId: users[2]._id,
  latitude: 39.308641,
  longitude: -122.341854,
  genre: "landscape",
  description: "greenery",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo373 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sites-4.jpg",
  spotId: spot114._id,
  userId: users[2]._id,
  latitude: 39.308641,
  longitude: -122.341854,
  genre: "landscape",
  description: "huge trees",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo374 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sites-5.jpg",
  spotId: spot114._id,
  userId: users[2]._id,
  latitude: 39.308641,
  longitude: -122.341854,
  genre: "landscape",
  description: "light in trees",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo375 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/lodoga-1.jpg",
  spotId: spot115._id,
  userId: users[3]._id,
  latitude: 39.300832,
  longitude: -122.487178,
  genre: "landscape",
  description: "interior design",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo376 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/lodoga-2.jpg",
  spotId: spot115._id,
  userId: users[3]._id,
  latitude: 39.300832,
  longitude: -122.487178,
  genre: "landscape",
  description: "bowls",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo377 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/lodoga-5.jpg",
  spotId: spot115._id,
  userId: users[3]._id,
  latitude: 39.300832,
  longitude: -122.487178,
  genre: "landscape",
  description: "vintage cam",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo378 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/lodoga-4.jpg",
  spotId: spot115._id,
  userId: users[3]._id,
  latitude: 39.300832,
  longitude: -122.487178,
  genre: "landscape",
  description: "old piano",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo379 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/lodoga-5.jpg",
  spotId: spot115._id,
  userId: users[3]._id,
  latitude: 39.300832,
  longitude: -122.487178,
  genre: "landscape",
  description: "enjoying a coffee",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo380 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mtdiablo-1.jpg",
  spotId: spot116._id,
  userId: users[0],
  latitude: 37.881251,
  longitude: -121.914153,
  genre: "landscape",
  description: "mt diablo",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo381 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mtdiablo-2.jpg",
  spotId: spot116._id,
  userId: users[1],
  latitude: 37.881251,
  longitude: -121.914153,
  genre: "landscape",
  description: "mt diablo",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo382 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mtdiablo-3.jpg",
  spotId: spot116._id,
  userId: users[2],
  latitude: 37.881251,
  longitude: -121.914153,
  genre: "landscape",
  description: "mt diablo",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo383 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mtdiablo-4.jpg",
  spotId: spot116._id,
  userId: users[3],
  latitude: 37.881251,
  longitude: -121.914153,
  genre: "landscape",
  description: "mt diablo",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo384 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/wc-1.jpg",
  spotId: spot116._id,
  userId: users[0],
  latitude: 37.881251,
  longitude: -121.914153,
  genre: "landscape",
  description: "mt diablo",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo385 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/wc-1.jpg",
  spotId: spot117._id,
  userId: users[0],
  latitude: 37.93483,
  longitude: -122.065975,
  genre: "landscape",
  description: "flower",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo386 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/wc-2.jpg",
  spotId: spot117._id,
  userId: users[2],
  latitude: 37.93483,
  longitude: -122.065975,
  genre: "landscape",
  description: "flower!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo387 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/wc-3.jpg",
  spotId: spot117._id,
  userId: users[1],
  latitude: 37.93483,
  longitude: -122.065975,
  genre: "landscape",
  description: "tessie",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo388 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/wc-4.jpg",
  spotId: spot117._id,
  userId: users[0],
  latitude: 37.93483,
  longitude: -122.065975,
  genre: "landscape",
  description: "pup",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo389 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/wc-5.jpg",
  spotId: spot117._id,
  userId: users[2],
  latitude: 37.93483,
  longitude: -122.065975,
  genre: "landscape",
  description: "dog",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo390 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/delnorte-1.jpg",
  spotId: spot118._id,
  userId: users[1],
  latitude: 41.671081,
  longitude: -123.960245,
  genre: "landscape",
  description: "ocean views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo391 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/delnorte-2.jpg",
  spotId: spot118._id,
  userId: users[0],
  latitude: 41.671081,
  longitude: -123.960245,
  genre: "landscape",
  description: "ocean views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo392 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/delnorte-3.jpg",
  spotId: spot118._id,
  userId: users[2],
  latitude: 41.671081,
  longitude: -123.960245,
  genre: "landscape",
  description: "ocean views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo393 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/delnorte-4.jpg",
  spotId: spot118._id,
  userId: users[3],
  latitude: 41.671081,
  longitude: -123.960245,
  genre: "landscape",
  description: "ocean views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo394 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/delnorte-5.jpg",
  spotId: spot118._id,
  userId: users[2],
  latitude: 41.671081,
  longitude: -123.960245,
  genre: "landscape",
  description: "ocean views",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo395 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/redwoods-2.jpg",
  spotId: spot119._id,
  userId: users[2],
  latitude: 41.890231,
  longitude: -123.7158,
  genre: "landscape",
  description: "redwood grove",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo396 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/redwoods-3.jpg",
  spotId: spot119._id,
  userId: users[0],
  latitude: 41.890231,
  longitude: -123.7158,
  genre: "landscape",
  description: "redwood",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo397 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/redwoods-4.jpg",
  spotId: spot119._id,
  userId: users[3],
  latitude: 41.890231,
  longitude: -123.7158,
  genre: "landscape",
  description: "redwoods",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo398 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/redwoods-5.jpg",
  spotId: spot119._id,
  userId: users[2],
  latitude: 41.890231,
  longitude: -123.7158,
  genre: "landscape",
  description: "redwood grove",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo399 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/redwoods-1.jpg",
  spotId: spot119._id,
  userId: users[1],
  latitude: 41.890231,
  longitude: -123.7158,
  genre: "landscape",
  description: "redwood grove",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo400 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shasta1.jpg",
  spotId: spot82._id,
  userId: users[1]._id,
  latitude: 40.862732,
  longitude: -122.359313,
  genre: "astro",
  description: "So Cool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo401 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shasta2.jpg",
  spotId: spot82._id,
  userId: users[0]._id,
  latitude: 40.862732,
  longitude: -122.359313,
  genre: "landscape",
  description: "A beaut",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo402 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shasta3.jpg",
  spotId: spot82._id,
  userId: users[0]._id,
  latitude: 40.862732,
  longitude: -122.359313,
  genre: "wildlife",
  description: "I cant believe i saw this",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo403 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shasta4.jpg",
  spotId: spot82._id,
  userId: users[0]._id,
  latitude: 40.862732,
  longitude: -122.359313,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo404 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shasta5.jpg",
  spotId: spot82._id,
  userId: users[1]._id,
  latitude: 40.862732,
  longitude: -122.359313,
  genre: "wildlife",
  description: "Nature is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo405 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shasta6.jpg",
  spotId: spot82._id,
  userId: users[3]._id,
  latitude: 40.862732,
  longitude: -122.359313,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo406 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shasta6.jpg",
  spotId: spot83._id,
  userId: users[4]._id,
  latitude: 40.927093,
  longitude: -121.625976,
  genre: "astro",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo407 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shasta7.jpg",
  spotId: spot83._id,
  userId: users[2]._id,
  latitude: 40.927093,
  longitude: -121.625976,
  genre: "landscape",
  description: "Gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo408 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shasta8.jpg",
  spotId: spot83._id,
  userId: users[2]._id,
  latitude: 40.927093,
  longitude: -121.625976,
  genre: "landscape",
  description: "Can't wait to go back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo409 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shasta9.jpg",
  spotId: spot83._id,
  userId: users[2]._id,
  latitude: 40.927093,
  longitude: -121.625976,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo410 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shasta10.jpg",
  spotId: spot83._id,
  userId: users[0]._id,
  latitude: 40.927093,
  longitude: -121.625976,
  genre: "landscape",
  description: "Cute!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo411 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sierra1.jpg",
  spotId: spot86._id,
  userId: users[0]._id,
  latitude: 39.559534,
  longitude: -120.764373,
  genre: "wildlife",
  description: "Cute",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo412 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sierra2.jpg",
  spotId: spot86._id,
  userId: users[3]._id,
  latitude: 39.559534,
  longitude: -120.764373,
  genre: "landscape",
  description: "The view is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo413 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sierra3.jpg",
  spotId: spot86._id,
  userId: users[3]._id,
  latitude: 39.559534,
  longitude: -120.764373,
  genre: "landscape",
  description: "how beautiful!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo414 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sierra4.jpg",
  spotId: spot86._id,
  userId: users[2]._id,
  latitude: 39.559534,
  longitude: -120.764373,
  genre: "landscape",
  description: "must come",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo415 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sierra5.jpg",
  spotId: spot86._id,
  userId: users[3]._id,
  latitude: 39.559534,
  longitude: -120.764373,
  genre: "landscape",
  description: "will be back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo416 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sierra6.jpg",
  spotId: spot87._id,
  userId: users[2]._id,
  latitude: 39.61351,
  longitude: -120.352386,
  genre: "landscape",
  description: "adorbs",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo417 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sierra7.jpg",
  spotId: spot87._id,
  userId: users[0]._id,
  latitude: 39.61351,
  longitude: -120.352386,
  genre: "landscape",
  description: "best photo spot ever!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo418 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sierra8.jpg",
  spotId: spot87._id,
  userId: users[0]._id,
  latitude: 39.61351,
  longitude: -120.352386,
  genre: "landscape",
  description: "Will have to come back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo419 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sierra9.jpg",
  spotId: spot87._id,
  userId: users[0]._id,
  latitude: 39.61351,
  longitude: -120.352386,
  genre: "landscape",
  description: "so gorg",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo420 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sierra10.jpg",
  spotId: spot87._id,
  userId: users[0]._id,
  latitude: 39.61351,
  longitude: -120.352386,
  genre: "landscape",
  description: "beautiful",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo421 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/siskiyou1.jpg",
  spotId: spot88._id,
  userId: users[1]._id,
  latitude: 41.764315,
  longitude: -122.06359,
  genre: "landscape",
  description: "Cute",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo422 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/siskiyou2.jpg",
  spotId: spot88._id,
  userId: users[3]._id,
  latitude: 41.764315,
  longitude: -122.06359,
  genre: "landscape",
  description: "The view is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo423 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/siskiyou3.jpg",
  spotId: spot88._id,
  userId: users[4]._id,
  latitude: 41.764315,
  longitude: -122.06359,
  genre: "landscape",
  description: "how beautiful!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo424 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/siskiyou4.jpg",
  spotId: spot88._id,
  userId: users[2]._id,
  latitude: 41.764315,
  longitude: -122.06359,
  genre: "landscape",
  description: "must come",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo425 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/siskyou5.jpg",
  spotId: spot88._id,
  userId: users[0]._id,
  latitude: 41.764315,
  longitude: -122.06359,
  genre: "landscape",
  description: "will be back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo426 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/siskyou6.jpg",
  spotId: spot89._id,
  userId: users[1]._id,
  latitude: 41.823698,
  longitude: -123.321524,
  genre: "landscape",
  description: "adorbs",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo427 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/siskyou7.jpg",
  spotId: spot89._id,
  userId: users[3]._id,
  latitude: 41.823698,
  longitude: -123.321524,
  genre: "landscape",
  description: "best photo spot ever!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo428 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sierra3.jpg",
  spotId: spot89._id,
  userId: users[4]._id,
  latitude: 41.823698,
  longitude: -123.321524,
  genre: "landscape",
  description: "Will have to come back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo429 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sierra1.jpg",
  spotId: spot89._id,
  userId: users[2]._id,
  latitude: 41.823698,
  longitude: -123.321524,
  genre: "landscape",
  description: "so gorg",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo430 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/solano1.jpg",
  spotId: spot90._id,
  userId: users[1]._id,
  latitude: 38.347546,
  longitude: -121.975432,
  genre: "landscape",
  description: "beautiful",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo431 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/solano2.jpg",
  spotId: spot90._id,
  userId: users[3]._id,
  latitude: 38.347546,
  longitude: -121.975432,
  genre: "landscape",
  description: "Cute",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo432 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/solano3.jpg",
  spotId: spot90._id,
  userId: users[4]._id,
  latitude: 38.347546,
  longitude: -121.975432,
  genre: "landscape",
  description: "The view is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo433 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/solano4.jpg",
  spotId: spot90._id,
  userId: users[2]._id,
  latitude: 38.347546,
  longitude: -121.975432,
  genre: "landscape",
  description: "how beautiful!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo434 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/solano5.jpg",
  spotId: spot90._id,
  userId: users[3]._id,
  latitude: 38.347546,
  longitude: -121.975432,
  genre: "landscape",
  description: "must come",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo435 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/solano6.jpg",
  spotId: spot91._id,
  userId: users[4]._id,
  latitude: 38.460545,
  longitude: -121.842222,
  genre: "landscape",
  description: "will be back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo436 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/solano7.jpg",
  spotId: spot91._id,
  userId: users[2]._id,
  latitude: 38.460545,
  longitude: -121.842222,
  genre: "landscape",
  description: "adorbs",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo437 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/solano8.jpg",
  spotId: spot91._id,
  userId: users[0]._id,
  latitude: 38.460545,
  longitude: -121.842222,
  genre: "landscape",
  description: "best photo spot ever!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo438 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/solano9.jpg",
  spotId: spot91._id,
  userId: users[1]._id,
  latitude: 38.460545,
  longitude: -121.842222,
  genre: "landscape",
  description: "Will have to come back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo439 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/solano10.jpg",
  spotId: spot91._id,
  userId: users[3]._id,
  latitude: 38.460545,
  longitude: -121.842222,
  genre: "landscape",
  description: "so gorg",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo440 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sonoma1.jpg",
  spotId: spot92._id,
  userId: users[4]._id,
  latitude: 38.349759,
  longitude: -123.028457,
  genre: "landscape",
  description: "beautiful",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo441 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sonoma1.jpg",
  spotId: spot92._id,
  userId: users[2]._id,
  latitude: 38.349759,
  longitude: -123.028457,
  genre: "landscape",
  description: "Cute",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo442 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sonoma2.jpg",
  spotId: spot92._id,
  userId: users[1]._id,
  latitude: 38.349759,
  longitude: -123.028457,
  genre: "landscape",
  description: "The view is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo443 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sonoma3.jpg",
  spotId: spot92._id,
  userId: users[3]._id,
  latitude: 38.349759,
  longitude: -123.028457,
  genre: "landscape",
  description: "how beautiful!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo444 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sonoma4.jpg",
  spotId: spot92._id,
  userId: users[4]._id,
  latitude: 38.349759,
  longitude: -123.028457,
  genre: "landscape",
  description: "must come",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo445 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sonoma5.jpg",
  spotId: spot93._id,
  userId: users[4]._id,
  latitude: 38.471356,
  longitude: -122.740066,
  genre: "landscape",
  description: "will be back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo446 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sonoma6.jpg",
  spotId: spot93._id,
  userId: users[2]._id,
  latitude: 38.471356,
  longitude: -122.740066,
  genre: "landscape",
  description: "adorbs",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo447 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sonoma7.jpg",
  spotId: spot93._id,
  userId: users[0]._id,
  latitude: 38.471356,
  longitude: -122.740066,
  genre: "landscape",
  description: "best photo spot ever!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo448 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sonoma8.jpg",
  spotId: spot93._id,
  userId: users[1]._id,
  latitude: 38.471356,
  longitude: -122.740066,
  genre: "landscape",
  description: "Will have to come back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo449 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sonoma9.jpg",
  spotId: spot93._id,
  userId: users[3]._id,
  latitude: 38.471356,
  longitude: -122.740066,
  genre: "landscape",
  description: "so gorg",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo450 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/stanislaus1.jpg",
  spotId: spot94._id,
  userId: users[4]._id,
  latitude: 37.471014,
  longitude: -121.146536,
  genre: "landscape",
  description: "beautiful",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo451 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/stanislaus2.jpg",
  spotId: spot94._id,
  userId: users[2]._id,
  latitude: 37.471014,
  longitude: -121.146536,
  genre: "landscape",
  description: "Cute",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo452 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/stanislaus3.jpg",
  spotId: spot94._id,
  userId: users[1]._id,
  latitude: 37.471014,
  longitude: -121.146536,
  genre: "landscape",
  description: "The view is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo453 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/stanislaus4.jpg",
  spotId: spot94._id,
  userId: users[3]._id,
  latitude: 37.471014,
  longitude: -121.146536,
  genre: "landscape",
  description: "how beautiful!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo454 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/stanislaus5.jpg",
  spotId: spot94._id,
  userId: users[4]._id,
  latitude: 37.471014,
  longitude: -121.146536,
  genre: "landscape",
  description: "must come",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo455 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/stanislaus6.jpg",
  spotId: spot95._id,
  userId: users[4]._id,
  latitude: 37.717836,
  longitude: -120.835546,
  genre: "landscape",
  description: "will be back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo456 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/stanislaus7.jpg",
  spotId: spot95._id,
  userId: users[2]._id,
  latitude: 37.717836,
  longitude: -120.835546,
  genre: "landscape",
  description: "adorbs",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo457 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/stanislaus8.jpg",
  spotId: spot95._id,
  userId: users[0]._id,
  latitude: 37.717836,
  longitude: -120.835546,
  genre: "landscape",
  description: "best photo spot ever!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo458 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/stanislaus9.jpg",
  spotId: spot95._id,
  userId: users[1]._id,
  latitude: 37.717836,
  longitude: -120.835546,
  genre: "landscape",
  description: "Will have to come back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo459 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/stanislaus10.jpg",
  spotId: spot95._id,
  userId: users[3]._id,
  latitude: 37.717836,
  longitude: -120.835546,
  genre: "landscape",
  description: "so gorg",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo460 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sutter1.jpg",
  spotId: spot96._id,
  userId: users[4]._id,
  latitude: 39.186046,
  longitude: -121.825559,
  genre: "landscape",
  description: "beautiful",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo461 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sutter2.jpg",
  spotId: spot96._id,
  userId: users[2]._id,
  latitude: 39.186046,
  longitude: -121.825559,
  genre: "landscape",
  description: "Cute",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo462 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sutter3.jpg",
  spotId: spot96._id,
  userId: users[1]._id,
  latitude: 39.186046,
  longitude: -121.825559,
  genre: "landscape",
  description: "The view is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo463 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sutter4.jpg",
  spotId: spot96._id,
  userId: users[3]._id,
  latitude: 39.186046,
  longitude: -121.825559,
  genre: "landscape",
  description: "how beautiful!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo464 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sutter5.jpg",
  spotId: spot96._id,
  userId: users[4]._id,
  latitude: 39.186046,
  longitude: -121.825559,
  genre: "landscape",
  description: "must come",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo465 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sutter6.jpg",
  spotId: spot97._id,
  userId: users[4]._id,
  latitude: 38.869198,
  longitude: -121.537168,
  genre: "landscape",
  description: "will be back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo466 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sutter7.jpg",
  spotId: spot97._id,
  userId: users[2]._id,
  latitude: 38.869198,
  longitude: -121.537168,
  genre: "landscape",
  description: "adorbs",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo467 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sutter8.jpg",
  spotId: spot97._id,
  userId: users[0]._id,
  latitude: 38.869198,
  longitude: -121.537168,
  genre: "landscape",
  description: "best photo spot ever!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo468 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sutter9.jpg",
  spotId: spot97._id,
  userId: users[1]._id,
  latitude: 38.869198,
  longitude: -121.537168,
  genre: "landscape",
  description: "Will have to come back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo469 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/sutter10.jpg",
  spotId: spot97._id,
  userId: users[3]._id,
  latitude: 38.869198,
  longitude: -121.537168,
  genre: "landscape",
  description: "so gorg",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo470 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tehama1.jpg",
  spotId: spot98._id,
  userId: users[4]._id,
  latitude: 40.25806,
  longitude: -122.309478,
  genre: "landscape",
  description: "beautiful",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo471 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tehama2.jpg",
  spotId: spot98._id,
  userId: users[2]._id,
  latitude: 40.25806,
  longitude: -122.309478,
  genre: "landscape",
  description: "Cute",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo472 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tehama3.jpg",
  spotId: spot98._id,
  userId: users[1]._id,
  latitude: 40.25806,
  longitude: -122.309478,
  genre: "landscape",
  description: "The view is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo473 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tehama4.jpg",
  spotId: spot98._id,
  userId: users[3]._id,
  latitude: 40.25806,
  longitude: -122.309478,
  genre: "landscape",
  description: "how beautiful!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo474 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tehama5.jpg",
  spotId: spot98._id,
  userId: users[4]._id,
  latitude: 40.25806,
  longitude: -122.309478,
  genre: "landscape",
  description: "must come",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo475 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tehama6.jpg",
  spotId: spot99._id,
  userId: users[4]._id,
  latitude: 39.89869,
  longitude: -122.196868,
  genre: "landscape",
  description: "will be back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo476 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tehama7.jpg",
  spotId: spot99._id,
  userId: users[2]._id,
  latitude: 39.89869,
  longitude: -122.196868,
  genre: "landscape",
  description: "adorbs",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo477 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tehama8.jpg",
  spotId: spot99._id,
  userId: users[0]._id,
  latitude: 39.89869,
  longitude: -122.196868,
  genre: "landscape",
  description: "best photo spot ever!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo478 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tehama9.jpg",
  spotId: spot99._id,
  userId: users[1]._id,
  latitude: 39.89869,
  longitude: -122.196868,
  genre: "landscape",
  description: "Will have to come back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo479 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tehama10.jpg",
  spotId: spot99._id,
  userId: users[3]._id,
  latitude: 39.89869,
  longitude: -122.196868,
  genre: "landscape",
  description: "so gorg",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo480 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/trinity1.jpg",
  spotId: spot100._id,
  userId: users[4]._id,
  latitude: 40.702463,
  longitude: -122.930413,
  genre: "landscape",
  description: "beautiful",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo481 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/trinity2.jpg",
  spotId: spot100._id,
  userId: users[2]._id,
  latitude: 40.702463,
  longitude: -122.930413,
  genre: "astro",
  description: "So Cool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo482 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/trinity3.jpg",
  spotId: spot100._id,
  userId: users[1]._id,
  latitude: 40.702463,
  longitude: -122.930413,
  genre: "landscape",
  description: "A beaut",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo483 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/trinity4.jpg",
  spotId: spot100._id,
  userId: users[3]._id,
  latitude: 40.702463,
  longitude: -122.930413,
  genre: "wildlife",
  description: "I cant believe i saw this",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo484 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/trinity5.jpg",
  spotId: spot100._id,
  userId: users[4]._id,
  latitude: 40.702463,
  longitude: -122.930413,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo485 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/trinity6.jpg",
  spotId: spot101._id,
  userId: users[0]._id,
  latitude: 40.420773,
  longitude: -123.455011,
  genre: "wildlife",
  description: "Nature is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo486 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/trinity7.jpg",
  spotId: spot101._id,
  userId: users[1]._id,
  latitude: 40.420773,
  longitude: -123.455011,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo487 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/trinity8.jpg",
  spotId: spot101._id,
  userId: users[3]._id,
  latitude: 40.420773,
  longitude: -123.455011,
  genre: "astro",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo488 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/trinity9.jpg",
  spotId: spot101._id,
  userId: users[4]._id,
  latitude: 40.420773,
  longitude: -123.455011,
  genre: "landscape",
  description: "Gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo489 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/trinity10.jpg",
  spotId: spot101._id,
  userId: users[2]._id,
  latitude: 40.420773,
  longitude: -123.455011,
  genre: "landscape",
  description: "Can't wait to go back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo490 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tulare1.jpg",
  spotId: spot102._id,
  userId: users[1]._id,
  latitude: 36.579397,
  longitude: -118.565611,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo491 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tulare2.jpg",
  spotId: spot102._id,
  userId: users[3]._id,
  latitude: 36.579397,
  longitude: -118.565611,
  genre: "astro",
  description: "So Cool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo492 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tulare3.jpg",
  spotId: spot102._id,
  userId: users[4]._id,
  latitude: 36.579397,
  longitude: -118.565611,
  genre: "landscape",
  description: "A beaut",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo493 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tulare4.jpg",
  spotId: spot102._id,
  userId: users[2]._id,
  latitude: 36.579397,
  longitude: -118.565611,
  genre: "wildlife",
  description: "I cant believe i saw this",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo494 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tulare5.jpg",
  spotId: spot102._id,
  userId: users[0]._id,
  latitude: 36.579397,
  longitude: -118.565611,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo495 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tulare6.jpg",
  spotId: spot103._id,
  userId: users[1]._id,
  latitude: 35.997152,
  longitude: -118.757872,
  genre: "wildlife",
  description: "Nature is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo496 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tulare7.jpg",
  spotId: spot103._id,
  userId: users[3]._id,
  latitude: 35.997152,
  longitude: -118.757872,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo497 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tulare8.jpg",
  spotId: spot103._id,
  userId: users[4]._id,
  latitude: 35.997152,
  longitude: -118.757872,
  genre: "astro",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo498 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tulare9.jpg",
  spotId: spot103._id,
  userId: users[2]._id,
  latitude: 35.997152,
  longitude: -118.757872,
  genre: "landscape",
  description: "Gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo499 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tulare10.jpg",
  spotId: spot103._id,
  userId: users[1]._id,
  latitude: 35.997152,
  longitude: -118.757872,
  genre: "landscape",
  description: "Can't wait to go back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo500 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tuolumne1.jpg",
  spotId: spot104._id,
  userId: users[3]._id,
  latitude: 37.919616,
  longitude: -120.409529,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo501 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tuolumne2.jpg",
  spotId: spot104._id,
  userId: users[4]._id,
  latitude: 37.919616,
  longitude: -120.409529,
  genre: "astro",
  description: "So Cool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo502 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tuolumne3.jpg",
  spotId: spot104._id,
  userId: users[4]._id,
  latitude: 37.919616,
  longitude: -120.409529,
  genre: "landscape",
  description: "A beaut",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo503 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tuolumne4.jpg",
  spotId: spot104._id,
  userId: users[2]._id,
  latitude: 37.919616,
  longitude: -120.409529,
  genre: "wildlife",
  description: "I cant believe i saw this",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo504 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tuolumne5.jpg",
  spotId: spot104._id,
  userId: users[0]._id,
  latitude: 37.919616,
  longitude: -120.409529,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo505 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tuolumne6.jpg",
  spotId: spot105._id,
  userId: users[1]._id,
  latitude: 38.261158,
  longitude: -119.986556,
  genre: "wildlife",
  description: "Nature is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo506 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tuolumne7.jpg",
  spotId: spot105._id,
  userId: users[3]._id,
  latitude: 38.261158,
  longitude: -119.986556,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo507 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tuolumne8.jpg",
  spotId: spot105._id,
  userId: users[4]._id,
  latitude: 38.261158,
  longitude: -119.986556,
  genre: "astro",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo508 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tuolumne9.jpg",
  spotId: spot105._id,
  userId: users[2]._id,
  latitude: 38.261158,
  longitude: -119.986556,
  genre: "landscape",
  description: "Gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo509 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/tuolumne10.jpg",
  spotId: spot105._id,
  userId: users[1]._id,
  latitude: 38.261158,
  longitude: -119.986556,
  genre: "landscape",
  description: "Can't wait to go back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo510 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/ventura1.jpg",
  spotId: spot106._id,
  userId: users[3]._id,
  latitude: 34.2923,
  longitude: -119.224894,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo511 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/ventura2.jpg",
  spotId: spot106._id,
  userId: users[4]._id,
  latitude: 34.2923,
  longitude: -119.224894,
  genre: "astro",
  description: "So Cool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo512 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/ventura3.jpg",
  spotId: spot106._id,
  userId: users[4]._id,
  latitude: 34.2923,
  longitude: -119.224894,
  genre: "landscape",
  description: "A beaut",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo513 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/ventura4.jpg",
  spotId: spot106._id,
  userId: users[2]._id,
  latitude: 34.2923,
  longitude: -119.224894,
  genre: "wildlife",
  description: "I cant believe i saw this",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo514 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/ventura5.jpg",
  spotId: spot106._id,
  userId: users[0]._id,
  latitude: 34.2923,
  longitude: -119.224894,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo515 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/ventura6.jpg",
  spotId: spot107._id,
  userId: users[1]._id,
  latitude: 34.696984,
  longitude: -119.363201,
  genre: "wildlife",
  description: "Nature is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo516 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/ventura7.jpg",
  spotId: spot107._id,
  userId: users[3]._id,
  latitude: 34.696984,
  longitude: -119.363201,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo517 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/ventura8.jpg",
  spotId: spot107._id,
  userId: users[4]._id,
  latitude: 34.696984,
  longitude: -119.363201,
  genre: "astro",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo518 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/ventura9.jpg",
  spotId: spot107._id,
  userId: users[2]._id,
  latitude: 34.696984,
  longitude: -119.363201,
  genre: "landscape",
  description: "Gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo519 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/ventura10.jpg",
  spotId: spot107._id,
  userId: users[1]._id,
  latitude: 34.696984,
  longitude: -119.363201,
  genre: "landscape",
  description: "Can't wait to go back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo520 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yolo1.jpg",
  spotId: spot108._id,
  userId: users[3]._id,
  latitude: 38.816309,
  longitude: -122.144209,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo521 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yolo2.jpg",
  spotId: spot108._id,
  userId: users[4]._id,
  latitude: 38.816309,
  longitude: -122.144209,
  genre: "astro",
  description: "So Cool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo522 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yolo3.jpg",
  spotId: spot108._id,
  userId: users[4]._id,
  latitude: 38.816309,
  longitude: -122.144209,
  genre: "landscape",
  description: "A beaut",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo523 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yolo4.jpg",
  spotId: spot108._id,
  userId: users[2]._id,
  latitude: 38.816309,
  longitude: -122.144209,
  genre: "wildlife",
  description: "I cant believe i saw this",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo524 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yolo5.jpg",
  spotId: spot108._id,
  userId: users[0]._id,
  latitude: 38.816309,
  longitude: -122.144209,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo525 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yolo6.jpg",
  spotId: spot109._id,
  userId: users[1]._id,
  latitude: 38.647047,
  longitude: -121.752821,
  genre: "wildlife",
  description: "Nature is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo526 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yolo7.jpg",
  spotId: spot109._id,
  userId: users[3]._id,
  latitude: 38.647047,
  longitude: -121.752821,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo527 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yolo8.jpg",
  spotId: spot109._id,
  userId: users[4]._id,
  latitude: 38.647047,
  longitude: -121.752821,
  genre: "astro",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo528 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yolo9.jpg",
  spotId: spot109._id,
  userId: users[2]._id,
  latitude: 38.647047,
  longitude: -121.752821,
  genre: "landscape",
  description: "Gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo529 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yolo10.jpg",
  spotId: spot109._id,
  userId: users[1]._id,
  latitude: 38.647047,
  longitude: -121.752821,
  genre: "landscape",
  description: "Can't wait to go back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo530 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yuba1.jpg",
  spotId: spot110._id,
  userId: users[3]._id,
  latitude: 39.118931,
  longitude: -121.524825,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo531 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yuba2.jpg",
  spotId: spot110._id,
  userId: users[4]._id,
  latitude: 39.118931,
  longitude: -121.524825,
  genre: "astro",
  description: "So Cool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo532 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yuba3.jpg",
  spotId: spot110._id,
  userId: users[4]._id,
  latitude: 39.118931,
  longitude: -121.524825,
  genre: "landscape",
  description: "A beaut",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo533 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yuba4.jpg",
  spotId: spot110._id,
  userId: users[2]._id,
  latitude: 39.118931,
  longitude: -121.524825,
  genre: "wildlife",
  description: "I cant believe i saw this",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo534 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yuba5.jpg",
  spotId: spot110._id,
  userId: users[0]._id,
  latitude: 39.118931,
  longitude: -121.524825,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo535 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yuba1.jpg",
  spotId: spot111._id,
  userId: users[1]._id,
  latitude: 39.45905,
  longitude: -121.132064,
  genre: "wildlife",
  description: "Nature is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo536 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yuba7.jpg",
  spotId: spot111._id,
  userId: users[3]._id,
  latitude: 39.45905,
  longitude: -121.132064,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo537 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yuba8.jpg",
  spotId: spot111._id,
  userId: users[4]._id,
  latitude: 39.45905,
  longitude: -121.132064,
  genre: "astro",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo538 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yuba9.jpg",
  spotId: spot111._id,
  userId: users[2]._id,
  latitude: 39.45905,
  longitude: -121.132064,
  genre: "landscape",
  description: "Gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo539 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/yuba10.jpg",
  spotId: spot111._id,
  userId: users[1]._id,
  latitude: 39.45905,
  longitude: -121.132064,
  genre: "landscape",
  description: "Can't wait to go back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo540 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/fresno-1.jpg",
  spotId: spot122._id,
  userId: users[3]._id,
  latitude: 36.727662,
  longitude: -119.812953,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo541 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/fresno-2.jpg",
  spotId: spot122._id,
  userId: users[4]._id,
  latitude: 36.727662,
  longitude: -119.812953,
  genre: "astro",
  description: "So Cool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo542 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/fresno-3.jpg",
  spotId: spot122._id,
  userId: users[2]._id,
  latitude: 36.727662,
  longitude: -119.812953,
  genre: "landscape",
  description: "A beaut",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo543 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/fresno-4.jpg",
  spotId: spot122._id,
  userId: users[1]._id,
  latitude: 36.727662,
  longitude: -119.812953,
  genre: "wildlife",
  description: "I cant believe i saw this",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo544 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/fresno-5.jpg",
  spotId: spot122._id,
  userId: users[3]._id,
  latitude: 36.727662,
  longitude: -119.812953,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo545 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shaver-1.jpg",
  spotId: spot123._id,
  userId: users[4]._id,
  latitude: 37.102815,
  longitude: -119.298728,
  genre: "wildlife",
  description: "Nature is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo546 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shaver-2.jpg",
  spotId: spot123._id,
  userId: users[2]._id,
  latitude: 37.102815,
  longitude: -119.298728,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo547 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shaver-3.jpg",
  spotId: spot123._id,
  userId: users[1]._id,
  latitude: 37.102815,
  longitude: -119.298728,
  genre: "astro",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo548 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shaver-4.jpg",
  spotId: spot123._id,
  userId: users[3]._id,
  latitude: 37.102815,
  longitude: -119.298728,
  genre: "landscape",
  description: "Gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo549 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/shaver-5.jpg",
  spotId: spot123._id,
  userId: users[4]._id,
  latitude: 37.102815,
  longitude: -119.298728,
  genre: "landscape",
  description: "Can't wait to go back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo550 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/elkcreek-1.jpg",
  spotId: spot124._id,
  userId: users[2]._id,
  latitude: 39.603152,
  longitude: -122.541939,
  genre: "astro",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo551 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/elkcreek-2.jpg",
  spotId: spot124._id,
  userId: users[1]._id,
  latitude: 39.603152,
  longitude: -122.541939,
  genre: "astro",
  description: "So Cool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo552 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/elkcreek-3.jpg",
  spotId: spot124._id,
  userId: users[3]._id,
  latitude: 39.603152,
  longitude: -122.541939,
  genre: "astro",
  description: "A beaut",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo553 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/elkcreek-4.jpg",
  spotId: spot124._id,
  userId: users[4]._id,
  latitude: 39.603152,
  longitude: -122.541939,
  genre: "astro",
  description: "I cant believe i saw this",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo554 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/elkcreek-5.jpg",
  spotId: spot124._id,
  userId: users[2]._id,
  latitude: 39.603152,
  longitude: -122.541939,
  genre: "astro",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo555 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mendoforest-1.jpg",
  spotId: spot125._id,
  userId: users[4]._id,
  latitude: 39.588245,
  longitude: -122.801767,
  genre: "landscape",
  description: "Nature is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo556 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mendoforest-2.jpg",
  spotId: spot125._id,
  userId: users[2]._id,
  latitude: 39.588245,
  longitude: -122.801767,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo557 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mendoforest-3.jpg",
  spotId: spot125._id,
  userId: users[1]._id,
  latitude: 39.588245,
  longitude: -122.801767,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo558 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mendoforest-4.jpg",
  spotId: spot125._id,
  userId: users[3]._id,
  latitude: 39.588245,
  longitude: -122.801767,
  genre: "landscape",
  description: "Gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo559 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/mendoforest-5.jpg",
  spotId: spot125._id,
  userId: users[4]._id,
  latitude: 39.588245,
  longitude: -122.801767,
  genre: "landscape",
  description: "Can't wait to go back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo560 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/eureka-1.jpg",
  spotId: spot126._id,
  userId: users[2]._id,
  latitude: 40.715606,
  longitude: -124.158907,
  genre: "wildlife",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo561 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/eureka-2.jpg",
  spotId: spot126._id,
  userId: users[0]._id,
  latitude: 40.715606,
  longitude: -124.158907,
  genre: "wildlife",
  description: "So Cool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo562 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/eureka-3.jpg",
  spotId: spot126._id,
  userId: users[1]._id,
  latitude: 40.715606,
  longitude: -124.158907,
  genre: "wildlife",
  description: "A beaut",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo563 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/eureka-4.jpg",
  spotId: spot126._id,
  userId: users[3]._id,
  latitude: 40.715606,
  longitude: -124.158907,
  genre: "wildlife",
  description: "I cant believe i saw this",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo564 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/eureka-5.jpg",
  spotId: spot126._id,
  userId: users[4]._id,
  latitude: 40.715606,
  longitude: -124.158907,
  genre: "wildlife",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo565 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/humboldt-1.jpg",
  spotId: spot127._id,
  userId: users[2]._id,
  latitude: 41.176616,
  longitude: -124.082325,
  genre: "landscape",
  description: "Nature is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo566 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/humboldt-2.jpg",
  spotId: spot127._id,
  userId: users[4]._id,
  latitude: 41.176616,
  longitude: -124.082325,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo567 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/humboldt-3.jpg",
  spotId: spot127._id,
  userId: users[2]._id,
  latitude: 41.176616,
  longitude: -124.082325,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo568 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/humboldt-4.jpg",
  spotId: spot127._id,
  userId: users[1]._id,
  latitude: 41.176616,
  longitude: -124.082325,
  genre: "landscape",
  description: "Gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo569 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/humboldt-5.jpg",
  spotId: spot127._id,
  userId: users[3]._id,
  latitude: 41.176616,
  longitude: -124.082325,
  genre: "landscape",
  description: "Can't wait to go back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo570 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/fields-1.jpg",
  spotId: spot128._id,
  userId: users[4]._id,
  latitude: 32.882881,
  longitude: -115.362237,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo571 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/fields-2.jpg",
  spotId: spot128._id,
  userId: users[2]._id,
  latitude: 32.882881,
  longitude: -115.362237,
  genre: "lanscape",
  description: "So Cool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo572 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/fields-3.jpg",
  spotId: spot128._id,
  userId: users[0]._id,
  latitude: 32.882881,
  longitude: -115.362237,
  genre: "landscape",
  description: "A beaut",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo573 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/fields-4.jpg",
  spotId: spot128._id,
  userId: users[1]._id,
  latitude: 32.882881,
  longitude: -115.362237,
  genre: "landscape",
  description: "I cant believe i saw this",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo574 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/fields-5.jpg",
  spotId: spot128._id,
  userId: users[3]._id,
  latitude: 32.882881,
  longitude: -115.362237,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo575 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pups-1.jpg",
  spotId: spot129._id,
  userId: users[4]._id,
  latitude: 33.067211,
  longitude: -115.4721,
  genre: "portrait",
  description: "pups!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo576 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pups-1.jpg",
  spotId: spot129._id,
  userId: users[2]._id,
  latitude: 33.067211,
  longitude: -115.4721,
  genre: "portrait",
  description: "pups!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo577 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pups-1.jpg",
  spotId: spot129._id,
  userId: users[0]._id,
  latitude: 33.067211,
  longitude: -115.4721,
  genre: "portrait",
  description: "pups!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo578 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pups-1.jpg",
  spotId: spot129._id,
  userId: users[1]._id,
  latitude: 33.067211,
  longitude: -115.4721,
  genre: "portrait",
  description: "pups!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo579 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/pups-1.jpg",
  spotId: spot129._id,
  userId: users[3]._id,
  latitude: 33.067211,
  longitude: -115.4721,
  genre: "portrait",
  description: "pups!!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo580 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/death-1.jpg",
  spotId: spot130._id,
  userId: users[4]._id,
  latitude: 36.775831,
  longitude: -117.496483,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo581 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/death-2.jpg",
  spotId: spot130._id,
  userId: users[2]._id,
  latitude: 36.775831,
  longitude: -117.496483,
  genre: "landscape",
  description: "So Cool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo582 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/death-3.jpg",
  spotId: spot130._id,
  userId: users[0]._id,
  latitude: 36.775831,
  longitude: -117.496483,
  genre: "landscape",
  description: "A beaut",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo583 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/death-4.jpg",
  spotId: spot130._id,
  userId: users[3]._id,
  latitude: 36.775831,
  longitude: -117.496483,
  genre: "landscape",
  description: "I cant believe i saw this",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo584 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/death-5.jpg",
  spotId: spot130._id,
  userId: users[4]._id,
  latitude: 36.775831,
  longitude: -117.496483,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo585 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/salt-1.jpg",
  spotId: spot131._id,
  userId: users[2]._id,
  latitude: 36.121881,
  longitude: -116.809838,
  genre: "landscape",
  description: "Nature is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo586 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/salt-2.jpg",
  spotId: spot131._id,
  userId: users[1]._id,
  latitude: 36.121881,
  longitude: -116.809838,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo587 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/salt-3.jpg",
  spotId: spot131._id,
  userId: users[0]._id,
  latitude: 36.121881,
  longitude: -116.809838,
  genre: "astro",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo588 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/salt-4.jpg",
  spotId: spot131._id,
  userId: users[3]._id,
  latitude: 36.121881,
  longitude: -116.809838,
  genre: "landscape",
  description: "Gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo589 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/salt-5.jpg",
  spotId: spot131._id,
  userId: users[4]._id,
  latitude: 36.121881,
  longitude: -116.809838,
  genre: "landscape",
  description: "Can't wait to go back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo590 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/b1.jpg",
  spotId: spot132._id,
  userId: users[2]._id,
  latitude: 35.418965,
  longitude: -118.906816,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo591 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/b2.jpg",
  spotId: spot132._id,
  userId: users[1]._id,
  latitude: 35.418965,
  longitude: -118.906816,
  genre: "landscape",
  description: "So Cool",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo592 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/b3.jpg",
  spotId: spot132._id,
  userId: users[3]._id,
  latitude: 35.418965,
  longitude: -118.906816,
  genre: "landscape",
  description: "A beaut",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo593 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/b4.jpg",
  spotId: spot132._id,
  userId: users[4]._id,
  latitude: 35.418965,
  longitude: -118.906816,
  genre: "landscape",
  description: "I cant believe i saw this",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo594 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/b5.jpg",
  spotId: spot132._id,
  userId: users[2]._id,
  latitude: 35.418965,
  longitude: -118.906816,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo595 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bakersfield-1.jpg",
  spotId: spot133._id,
  userId: users[0]._id,
  latitude: 35.526331,
  longitude: -119.00844,
  genre: "landscape",
  description: "Nature is amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo596 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bakersfield-2.jpg",
  spotId: spot133._id,
  userId: users[3]._id,
  latitude: 35.526331,
  longitude: -119.00844,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo597 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bakersfield-3.jpg",
  spotId: spot133._id,
  userId: users[1]._id,
  latitude: 35.526331,
  longitude: -119.00844,
  genre: "landscape",
  description: "Amazing",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo598 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bakersfield-4.jpg",
  spotId: spot133._id,
  userId: users[4]._id,
  latitude: 35.526331,
  longitude: -119.00844,
  genre: "landscape",
  description: "Gorgeous",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo599 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/bakersfield-5.jpg",
  spotId: spot133._id,
  userId: users[2]._id,
  latitude: 35.526331,
  longitude: -119.00844,
  genre: "landscape",
  description: "Can't wait to go back",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo601 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/eldorado-1.jpg",
  spotId: spot120._id,
  userId: users[3]._id,
  latitude: 38.744229,
  longitude: -120.293128,
  genre: "aerial",
  description: "nightime in the forest",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo602 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/eldorado-2.jpg",
  spotId: spot120._id,
  userId: users[2]._id,
  latitude: 38.744229,
  longitude: -120.293128,
  genre: "landscape",
  description: "mountains",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo603 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/eldorado-3.jpg",
  spotId: spot120._id,
  userId: users[1]._id,
  latitude: 38.744229,
  longitude: -120.293128,
  genre: "landscape",
  description: "golden hour mountains",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo604 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/eldorado-4.jpg",
  spotId: spot120._id,
  userId: users[0]._id,
  latitude: 38.744229,
  longitude: -120.293128,
  genre: "landscape",
  description: "river!",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo605 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/eldorado-5.jpg",
  spotId: spot120._id,
  userId: users[3]._id,
  latitude: 38.744229,
  longitude: -120.293128,
  genre: "landscape",
  description: "nightime in the forest",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});

let photo606 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/SLT-1.jpg",
  spotId: spot121._id,
  userId: users[2]._id,
  latitude: 38.744229,
  longitude: -120.293128,
  genre: "landscape",
  description: "nightime in the forest",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo607 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/SLT-2.jpg",
  spotId: spot121._id,
  userId: users[1]._id,
  latitude: 38.744229,
  longitude: -120.293128,
  genre: "landscape",
  description: "nightime in the forest",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo608 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/SLT-3.jpg",
  spotId: spot121._id,
  userId: users[0]._id,
  latitude: 38.744229,
  longitude: -120.293128,
  genre: "landscape",
  description: "nightime in the forest",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo609 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/SLT-4.jpg",
  spotId: spot121._id,
  userId: users[2]._id,
  latitude: 38.744229,
  longitude: -120.293128,
  genre: "landscape",
  description: "nightime in the forest",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
  likes: [],
});
let photo610 = new Photo({
  url: "https://viewfinder-seeds.s3.us-west-2.amazonaws.com/viewFinderSeeds+2/SLT-5.jpg",
  spotId: spot121._id,
  userId: users[1]._id,
  latitude: 38.744229,
  longitude: -120.293128,
  genre: "landscape",
  description: "nightime in the forest",
  condition: conditions.sampleTwo(),
  transportation: transportations.sampleTwo(),
  bestTimeOfDay: bestTimesOfDay.sample(),
  payment: payments.sample(),
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
  photo27,
  photo28,
  photo29,
  photo30,
  photo31,
  photo32,
  photo33,
  photo34,
  photo35,
  photo36,
  photo37,
  photo38,
  photo40,
  photo41,
  photo42,
  photo43,
  photo44,
  photo45,
  photo46,
  photo47,
  photo48,
  photo49,
  photo50,
  photo51,
  photo52,
  photo53,
  photo54,
  photo55,
  photo56,
  photo57,
  photo58,
  photo59,
  photo60,
  photo61,
  photo62,
  photo63,
  photo64,
  photo65,
  photo66,
  photo67,
  photo68,
  photo69,
  photo70,
  photo71,
  photo72,
  photo73,
  photo74,
  photo75,
  photo76,
  photo77,
  photo78,
  photo79,
  photo80,
  photo81,
  photo82,
  photo83,
  photo84,
  photo85,
  photo86,
  photo87,
  photo88,
  photo89,
  photo90,
  photo91,
  photo92,
  photo93,
  photo94,
  photo95,
  photo96,
  photo97,
  photo98,
  photo99,
  photo100,
  photo101,
  photo102,
  photo103,
  photo104,
  photo105,
  photo106,
  photo107,
  photo108,
  photo109,
  photo110,
  photo111,
  photo112,
  photo113,
  photo114,
  photo115,
  photo116,
  photo117,
  photo118,
  photo119,
  photo120,
  photo121,
  photo122,
  photo123,
  photo124,
  photo125,
  photo126,
  photo127,
  photo128,
  photo129,
  photo130,
  photo131,
  photo132,
  photo133,
  photo134,
  photo135,
  photo136,
  photo137,
  photo138,
  photo139,
  photo140,
  photo141,
  photo142,
  photo143,
  photo144,
  photo145,
  photo146,
  photo147,
  photo148,
  photo149,
  photo150,
  photo151,
  photo152,
  photo153,
  photo154,
  photo155,
  photo156,
  photo157,
  photo158,
  photo159,
  photo160,
  photo161,
  photo162,
  photo163,
  photo164,
  photo165,
  photo166,
  photo167,
  photo168,
  photo169,
  photo170,
  photo171,
  photo172,
  photo173,
  photo174,
  photo175,
  photo176,
  photo177,
  photo178,
  photo179,
  photo180,
  photo181,
  photo182,
  photo183,
  photo184,
  photo185,
  photo186,
  photo187,
  photo188,
  photo189,
  photo190,
  photo191,
  photo192,
  photo193,
  photo194,
  photo195,
  photo196,
  photo197,
  photo198,
  photo199,
  photo200,
  photo201,
  photo202,
  photo203,
  photo204,
  photo205,
  photo206,
  photo207,
  photo208,
  photo209,
  photo210,
  photo211,
  photo212,
  photo213,
  photo214,
  photo215,
  photo216,
  photo217,
  photo218,
  photo219,
  photo220,
  photo221,
  photo222,
  photo223,
  photo224,
  photo225,
  photo226,
  photo227,
  photo228,
  photo229,
  photo230,
  photo231,
  photo232,
  photo233,
  photo234,
  photo235,
  photo236,
  photo237,
  photo238,
  photo239,
  photo240,
  photo241,
  photo242,
  photo243,
  photo244,
  photo245,
  photo246,
  photo247,
  photo248,
  photo249,
  photo250,
  photo251,
  photo254,
  photo255,
  photo256,
  photo257,
  photo258,
  photo259,
  photo260,
  photo261,
  photo262,
  photo263,
  photo264,
  photo265,
  photo266,
  photo267,
  photo268,
  photo269,
  photo270,
  photo271,
  photo272,
  photo273,
  photo274,
  photo275,
  photo276,
  photo277,
  photo278,
  photo279,
  photo280,
  photo281,
  photo282,
  photo283,
  photo284,
  photo285,
  photo286,
  photo287,
  photo288,
  photo289,
  photo290,
  photo291,
  photo292,
  photo293,
  photo294,
  photo300,
  photo301,
  photo302,
  photo303,
  photo304,
  photo305,
  photo306,
  photo307,
  photo308,
  photo309,
  photo310,
  photo311,
  photo312,
  photo313,
  photo314,
  photo315,
  photo316,
  photo317,
  photo318,
  photo319,
  photo320,
  photo321,
  photo322,
  photo323,
  photo324,
  photo325,
  photo326,
  photo327,
  photo328,
  photo329,
  photo330,
  photo331,
  photo332,
  photo333,
  photo334,
  photo335,
  photo336,
  photo337,
  photo338,
  photo339,
  photo340,
  photo341,
  photo342,
  photo343,
  photo344,
  photo345,
  photo346,
  photo347,
  photo348,
  photo349,
  photo350,
  photo351,
  photo352,
  photo353,
  photo354,
  photo355,
  photo356,
  photo357,
  photo358,
  photo359,
  photo360,
  photo361,
  photo362,
  photo363,
  photo364,
  photo365,
  photo366,
  photo367,
  photo368,
  photo369,
  photo370,
  photo371,
  photo372,
  photo373,
  photo374,
  photo375,
  photo376,
  photo377,
  photo378,
  photo379,
  photo380,
  photo381,
  photo382,
  photo383,
  photo384,
  photo385,
  photo386,
  photo387,
  photo388,
  photo389,
  photo390,
  photo391,
  photo392,
  photo393,
  photo394,
  photo395,
  photo396,
  photo397,
  photo398,
  photo399,
  photo400,
  photo401,
  photo402,
  photo403,
  photo404,
  photo405,
  photo406,
  photo407,
  photo408,
  photo409,
  photo410,
  photo411,
  photo412,
  photo413,
  photo414,
  photo415,
  photo416,
  photo417,
  photo418,
  photo419,
  photo420,
  photo421,
  photo422,
  photo423,
  photo424,
  photo425,
  photo426,
  photo427,
  photo428,
  photo429,
  photo430,
  photo431,
  photo432,
  photo433,
  photo434,
  photo435,
  photo436,
  photo437,
  photo438,
  photo439,
  photo440,
  photo441,
  photo442,
  photo443,
  photo444,
  photo445,
  photo446,
  photo447,
  photo448,
  photo449,
  photo450,
  photo451,
  photo452,
  photo453,
  photo454,
  photo455,
  photo456,
  photo457,
  photo458,
  photo459,
  photo460,
  photo461,
  photo462,
  photo463,
  photo464,
  photo465,
  photo466,
  photo467,
  photo468,
  photo469,
  photo470,
  photo471,
  photo472,
  photo473,
  photo474,
  photo475,
  photo476,
  photo477,
  photo478,
  photo479,
  photo480,
  photo481,
  photo482,
  photo483,
  photo484,
  photo485,
  photo486,
  photo487,
  photo488,
  photo489,
  photo490,
  photo491,
  photo492,
  photo493,
  photo494,
  photo495,
  photo496,
  photo497,
  photo498,
  photo499,
  photo500,
  photo501,
  photo502,
  photo503,
  photo504,
  photo505,
  photo506,
  photo507,
  photo508,
  photo509,
  photo510,
  photo511,
  photo512,
  photo513,
  photo514,
  photo515,
  photo516,
  photo517,
  photo518,
  photo519,
  photo520,
  photo521,
  photo522,
  photo523,
  photo524,
  photo525,
  photo526,
  photo527,
  photo528,
  photo529,
  photo530,
  photo531,
  photo532,
  photo533,
  photo534,
  photo535,
  photo536,
  photo537,
  photo538,
  photo539,
  photo540,
  photo541,
  photo542,
  photo543,
  photo544,
  photo545,
  photo546,
  photo547,
  photo548,
  photo549,
  photo550,
  photo551,
  photo552,
  photo553,
  photo554,
  photo555,
  photo556,
  photo557,
  photo558,
  photo559,
  photo560,
  photo561,
  photo562,
  photo563,
  photo564,
  photo565,
  photo566,
  photo567,
  photo568,
  photo569,
  photo570,
  photo571,
  photo572,
  photo573,
  photo574,
  photo575,
  photo576,
  photo577,
  photo578,
  photo579,
  photo580,
  photo581,
  photo582,
  photo583,
  photo584,
  photo585,
  photo586,
  photo587,
  photo588,
  photo589,
  photo590,
  photo591,
  photo592,
  photo593,
  photo594,
  photo595,
  photo596,
  photo597,
  photo598,
  photo599,
  photo601,
  photo602,
  photo603,
  photo604,
  photo605,
  photo606,
  photo607,
  photo608,
  photo609,
  photo610
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
spot22.photos.push(photo35);
spot25.photos.push(photo38);
spot17.photos.push(photo30);
spot18.photos.push(photo31);
spot20.photos.push(photo33);
spot21.photos.push(photo34);
spot24.photos.push(photo37);
spot23.photos.push(photo36);
spot19.photos.push(photo32);
spot27.photos.push(photo97, photo98, photo99, photo100, photo101);
spot28.photos.push(photo102, photo103, photo104, photo105, photo106);
spot32.photos.push(photo69,photo70,photo71,photo72,photo73);
spot33.photos.push(photo74, photo75, photo76, photo77, photo78);
spot38.photos.push(photo79, photo80, photo81, photo82, photo83);
spot39.photos.push(photo84, photo85, photo86, photo87, photo88);
spot47.photos.push(photo152, photo153, photo154, photo155, photo156);
spot48.photos.push(photo157, photo158, photo159, photo160, photo161);
spot49.photos.push(photo168, photo169, photo170, photo171, photo172);
spot50.photos.push(photo173, photo174, photo175, photo176, photo177);
spot56.photos.push(photo207, photo208, photo209, photo210, photo211);
spot57.photos.push(photo212, photo213, photo214, photo215, photo216);
spot58.photos.push(photo232, photo233, photo234, photo235, photo236);
spot59.photos.push(photo237, photo238, photo239, photo240, photo241);
spot29.photos.push(photo50, photo51, photo52, photo53, photo54);
spot30.photos.push(photo55, photo56, photo57, photo58, photo59);
spot34.photos.push(photo40, photo41, photo42, photo43, photo44);
spot35.photos.push(photo45, photo46, photo47, photo48, photo49);
spot36.photos.push(photo120, photo121, photo122, photo123, photo124);
spot37.photos.push(photo125, photo126, photo127, photo128, photo129);
spot42.photos.push(photo130, photo131, photo132, photo133, photo134);
spot43.photos.push(photo135, photo136, photo137, photo138, photo139);
spot51.photos.push(photo178, photo179, photo180, photo181, photo182);
spot52.photos.push(photo183, photo184, photo185, photo186, photo187);
spot54.photos.push(photo197, photo198, photo199, photo200, photo201);
spot55.photos.push(photo202, photo203, photo204, photo205, photo206);
spot61.photos.push(photo217, photo218, photo219, photo220, photo221);
spot62.photos.push(photo222, photo223, photo224, photo225, photo226);
spot63.photos.push(photo227, photo228, photo229, photo230, photo231);
spot63.photos.push(photo242, photo243, photo244, photo245, photo246);
spot67.photos.push(photo280, photo281, photo282, photo283, photo284);
spot68.photos.push(photo285, photo286, photo287, photo288, photo289);
spot69.photos.push(photo24, photo248, photo249, photo250, photo251);
spot70.photos.push(photo254, photo255, photo256, photo257, photo258);
spot73.photos.push(photo259, photo255, photo260, photo261, photo262, photo263);
spot74.photos.push(photo264, photo265, photo266, photo267, photo268, photo269);
spot75.photos.push(photo310, photo311, photo312, photo313, photo314);
spot76.photos.push(photo315, photo316, photo317, photo318, photo319);
spot70.photos.push(photo330, photo331, photo332, photo33, photo334);
spot80.photos.push(photo335, photo336, photo337, photo338, photo339);
spot9.photos.push(photo325, photo326, photo327, photo328, photo329);
spot78.photos.push(photo320, photo321, photo322, photo323, photo324);
spot112.photos.push(photo360, photo361, photo362, photo363, photo364); 
spot113.photos.push(photo365, photo366, photo367, photo368, photo369);
spot82.photos.push(photo400, photo401, photo402, photo403, photo404);
spot83.photos.push(photo406, photo407, photo408, photo409, photo405);
spot84.photos.push(photo350, photo351, photo352, photo353, photo354);
spot85.photos.push(photo355, photo356, photo357, photo358, photo359);
spot86.photos.push(photo411, photo412, photo413, photo414, photo415);
spot87.photos.push(photo416, photo417, photo418, photo419, photo410);
spot88.photos.push(photo420, photo422, photo423, photo424, photo425);
spot89.photos.push(photo426, photo427, photo428, photo429, photo421);
spot90.photos.push(photo431, photo432, photo433, photo434, photo435);
spot91.photos.push(photo436, photo437, photo438, photo439, photo430);
spot92.photos.push(photo440, photo441, photo442, photo443, photo444);
spot93.photos.push(photo445, photo446, photo447, photo448, photo449);
spot94.photos.push(photo450, photo451, photo452, photo453, photo454);
spot95.photos.push(photo455, photo456, photo457, photo458, photo459);
spot96.photos.push(photo460, photo461, photo462, photo463, photo464);
spot97.photos.push(photo465, photo466, photo467, photo468, photo469);
spot98.photos.push(photo470, photo471, photo472, photo473, photo474);
spot99.photos.push(photo475, photo476, photo477, photo478, photo479);
spot100.photos.push(photo480, photo481, photo482, photo483, photo484);
spot101.photos.push(photo485, photo486, photo487, photo488, photo489);
spot102.photos.push(photo490, photo491, photo492, photo493, photo494);
spot103.photos.push(photo495, photo496, photo497, photo498, photo499);
spot104.photos.push(photo500, photo501, photo502, photo503, photo504);
spot105.photos.push(photo505, photo506, photo507, photo508, photo509);
spot106.photos.push(photo510, photo511, photo512, photo513, photo514);
spot107.photos.push(photo515, photo516, photo517, photo518, photo519);
spot108.photos.push(photo520, photo521, photo522, photo523, photo524);
spot109.photos.push(photo525, photo526, photo527, photo528, photo529);
spot110.photos.push(photo530, photo531, photo532, photo533, photo534);
spot111.photos.push(photo535, photo536, photo537, photo538, photo539);
spot114.photos.push(photo370, photo371, photo372, photo373, photo374);
spot115.photos.push(photo375, photo376, photo377, photo378, photo379);
spot116.photos.push(photo380, photo381, photo382, photo383, photo384);
spot117.photos.push(photo385, photo386, photo387, photo388, photo389);
spot118.photos.push(photo390, photo391, photo392, photo393, photo394);
spot119.photos.push(photo395, photo396, photo397, photo398, photo399);
spot120.photos.push(photo601, photo602, photo603, photo604, photo605);
spot121.photos.push(photo606, photo607, photo608, photo609, photo610);
spot122.photos.push(photo540, photo541, photo542, photo543, photo544);
spot123.photos.push(photo545, photo546, photo547, photo548, photo549);
spot124.photos.push(photo550, photo551, photo552, photo553, photo554);
spot125.photos.push(photo555, photo556, photo557, photo558, photo559);
spot126.photos.push(photo560, photo561, photo562, photo563, photo564);
spot127.photos.push(photo565, photo566, photo567, photo568, photo569);
spot128.photos.push(photo570, photo571, photo572, photo573, photo574);
spot129.photos.push(photo575, photo572, photo573, photo574, photo575);
spot130.photos.push(photo580, photo581, photo582, photo583, photo584);
spot131.photos.push(photo585, photo586, photo587, photo588, photo589);
spot132.photos.push(photo590, photo591, photo592, photo593, photo594); 
spot133.photos.push(photo595, photo596, photo597, photo598, photo599);

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
users[4].photos.push(photo22);
users[4].photos.push(photo23);
users[4].photos.push(photo24);
users[4].photos.push(photo25);
users[4].photos.push(photo26);
users[4].photos.push(photo27);
users[4].photos.push(photo28);
users[2].photos.push(photo29);
users[0].photos.push(photo30);
users[1].photos.push(photo31);
users[3].photos.push(photo32);
users[4].photos.push(photo33);
users[2].photos.push(photo34);
users[1].photos.push(photo35);
users[3].photos.push(photo36);
users[4].photos.push(photo37);
users[2].photos.push(photo38);
users[4].photos.push(photo40);
users[2].photos.push(photo41);
users[0].photos.push(photo42);
users[1].photos.push(photo43);
users[3].photos.push(photo44);
users[4].photos.push(photo45);
users[2].photos.push(photo46);
users[1].photos.push(photo47);
users[3].photos.push(photo48);
users[4].photos.push(photo49);
users[4].photos.push(photo50);
users[2].photos.push(photo51);
users[0].photos.push(photo52);
users[1].photos.push(photo53);
users[3].photos.push(photo54);
users[4].photos.push(photo55);
users[2].photos.push(photo56);
users[1].photos.push(photo57);
users[3].photos.push(photo58);
users[4].photos.push(photo59);
users[4].photos.push(photo60);
users[2].photos.push(photo61);
users[0].photos.push(photo62);
users[1].photos.push(photo63);
users[3].photos.push(photo64);
users[4].photos.push(photo65);
users[2].photos.push(photo66);
users[1].photos.push(photo67);
users[3].photos.push(photo68);
users[4].photos.push(photo69);
users[4].photos.push(photo70);
users[2].photos.push(photo71);
users[0].photos.push(photo72);
users[1].photos.push(photo73);
users[3].photos.push(photo74);
users[4].photos.push(photo75);
users[2].photos.push(photo76);
users[1].photos.push(photo77);
users[3].photos.push(photo78);
users[4].photos.push(photo79);
users[4].photos.push(photo80);
users[2].photos.push(photo81);
users[0].photos.push(photo82);
users[1].photos.push(photo83);
users[3].photos.push(photo84);
users[4].photos.push(photo85);
users[2].photos.push(photo86);
users[1].photos.push(photo87);
users[3].photos.push(photo88);
users[4].photos.push(photo89);
users[0].photos.push(photo90);
users[1].photos.push(photo91);
users[3].photos.push(photo92);
users[4].photos.push(photo93);
users[2].photos.push(photo94);
users[1].photos.push(photo95);
users[3].photos.push(photo96);
users[4].photos.push(photo97);
users[2].photos.push(photo98);
users[0].photos.push(photo99);
users[1].photos.push(photo100);
users[3].photos.push(photo101);
users[4].photos.push(photo102);
users[2].photos.push(photo103);
users[1].photos.push(photo104);
users[3].photos.push(photo105);
users[4].photos.push(photo106);
users[4].photos.push(photo107);
users[2].photos.push(photo108);
users[0].photos.push(photo109);
users[1].photos.push(photo110);
users[3].photos.push(photo111);
users[4].photos.push(photo112);
users[2].photos.push(photo113);
users[1].photos.push(photo114);
users[3].photos.push(photo115);
users[4].photos.push(photo116);
users[4].photos.push(photo117);
users[2].photos.push(photo118);
users[0].photos.push(photo119);
users[1].photos.push(photo120);
users[3].photos.push(photo121);
users[4].photos.push(photo122);
users[2].photos.push(photo123);
users[1].photos.push(photo124);
users[3].photos.push(photo125);
users[4].photos.push(photo126);
users[4].photos.push(photo127);
users[2].photos.push(photo128);
users[0].photos.push(photo129);
users[1].photos.push(photo130);
users[3].photos.push(photo131);
users[4].photos.push(photo132);
users[2].photos.push(photo133);
users[1].photos.push(photo134);
users[3].photos.push(photo135);
users[4].photos.push(photo136);
users[4].photos.push(photo137);
users[2].photos.push(photo138);
users[0].photos.push(photo139);
users[1].photos.push(photo140);
users[3].photos.push(photo141);
users[4].photos.push(photo142);
users[2].photos.push(photo143);
users[1].photos.push(photo144);
users[3].photos.push(photo145);
users[4].photos.push(photo146);
users[2].photos.push(photo147);
users[1].photos.push(photo148);
users[3].photos.push(photo149);
users[4].photos.push(photo150);
users[2].photos.push(photo151);
users[1].photos.push(photo152);
users[3].photos.push(photo153);
users[4].photos.push(photo154);
users[2].photos.push(photo155);
users[1].photos.push(photo156);
users[3].photos.push(photo157);
users[4].photos.push(photo158);
users[2].photos.push(photo159);
users[4].photos.push(photo160);
users[2].photos.push(photo161);
users[1].photos.push(photo162);
users[3].photos.push(photo163);
users[4].photos.push(photo164);
users[2].photos.push(photo165);
users[0].photos.push(photo166);
users[1].photos.push(photo167);
users[3].photos.push(photo168);
users[4].photos.push(photo169);
users[2].photos.push(photo170);
users[4].photos.push(photo171);
users[2].photos.push(photo172);
users[1].photos.push(photo173);
users[3].photos.push(photo174);
users[4].photos.push(photo175);
users[2].photos.push(photo176);
users[0].photos.push(photo177);
users[1].photos.push(photo178);
users[3].photos.push(photo179);
users[4].photos.push(photo180);
users[2].photos.push(photo181);
users[0].photos.push(photo182);
users[1].photos.push(photo183);
users[3].photos.push(photo184);
users[4].photos.push(photo185);
users[2].photos.push(photo186);
users[0].photos.push(photo187);
users[3].photos.push(photo188);
users[4].photos.push(photo189);
users[2].photos.push(photo190);
users[1].photos.push(photo191);
users[0].photos.push(photo192);
users[3].photos.push(photo193);
users[4].photos.push(photo194);
users[2].photos.push(photo195);
users[1].photos.push(photo196);
users[3].photos.push(photo197);
users[4].photos.push(photo198);
users[2].photos.push(photo199);
users[0].photos.push(photo200);
users[3].photos.push(photo201);
users[1].photos.push(photo202);
users[4].photos.push(photo203);
users[2].photos.push(photo204);
users[0].photos.push(photo205);
users[3].photos.push(photo206);
users[4].photos.push(photo207);
users[2].photos.push(photo208);
users[1].photos.push(photo209);
users[3].photos.push(photo210);
users[4].photos.push(photo211);
users[2].photos.push(photo212);
users[0].photos.push(photo213);
users[4].photos.push(photo214);
users[2].photos.push(photo215);
users[1].photos.push(photo216);
users[3].photos.push(photo217);
users[4].photos.push(photo218);
users[2].photos.push(photo219);
users[0].photos.push(photo220);
users[1].photos.push(photo221);
users[3].photos.push(photo222);
users[4].photos.push(photo223);
users[2].photos.push(photo224);
users[0].photos.push(photo225);
users[1].photos.push(photo226);
users[1].photos.push(photo227);
users[1].photos.push(photo228);
users[1].photos.push(photo229);
users[2].photos.push(photo230);
users[2].photos.push(photo231);
users[0].photos.push(photo232);
users[1].photos.push(photo233);
users[3].photos.push(photo234);
users[4].photos.push(photo235);
users[2].photos.push(photo236);
users[2].photos.push(photo237);
users[2].photos.push(photo238);
users[2].photos.push(photo239);
users[2].photos.push(photo240);
users[2].photos.push(photo241);
users[0].photos.push(photo242);
users[2].photos.push(photo243);
users[1].photos.push(photo244);
users[0].photos.push(photo245);
users[0].photos.push(photo246);
users[0].photos.push(photo247);
users[0].photos.push(photo248);
users[0].photos.push(photo249);
users[0].photos.push(photo250);
users[0].photos.push(photo251);
users[1].photos.push(photo254);
users[1].photos.push(photo255);
users[0].photos.push(photo256);
users[2].photos.push(photo257);
users[3].photos.push(photo258);
users[3].photos.push(photo259);
users[3].photos.push(photo260);
users[3].photos.push(photo261);
users[3].photos.push(photo262);
users[3].photos.push(photo263);
users[3].photos.push(photo264);
users[3].photos.push(photo265);
users[3].photos.push(photo266);
users[3].photos.push(photo267);
users[3].photos.push(photo268);
users[3].photos.push(photo269);
users[2].photos.push(photo270);
users[0].photos.push(photo271);
users[1].photos.push(photo272);
users[3].photos.push(photo273);
users[4].photos.push(photo274);
users[2].photos.push(photo275);
users[0].photos.push(photo276);
users[1].photos.push(photo277);
users[3].photos.push(photo278);
users[4].photos.push(photo279);
users[2].photos.push(photo280);
users[0].photos.push(photo281);
users[1].photos.push(photo282);
users[3].photos.push(photo283);
users[4].photos.push(photo284);
users[2].photos.push(photo285);
users[0].photos.push(photo286);
users[1].photos.push(photo287);
users[3].photos.push(photo288);
users[4].photos.push(photo289);
users[2].photos.push(photo290);
users[0].photos.push(photo291);
users[1].photos.push(photo292);
users[3].photos.push(photo293);
users[4].photos.push(photo294);
users[2].photos.push(photo300);
users[0].photos.push(photo301);
users[1].photos.push(photo302);
users[3].photos.push(photo303);
users[4].photos.push(photo304);
users[2].photos.push(photo305);
users[0].photos.push(photo306);
users[1].photos.push(photo307);
users[3].photos.push(photo308);
users[4].photos.push(photo309);
users[2].photos.push(photo310);
users[0].photos.push(photo311);
users[1].photos.push(photo312);
users[3].photos.push(photo313);
users[4].photos.push(photo314);
users[2].photos.push(photo315);
users[0].photos.push(photo316);
users[1].photos.push(photo317);
users[3].photos.push(photo318);
users[4].photos.push(photo319);
users[4].photos.push(photo320);
users[4].photos.push(photo321);
users[4].photos.push(photo322);
users[4].photos.push(photo323);
users[4].photos.push(photo324);
users[2].photos.push(photo325);
users[0].photos.push(photo326);
users[1].photos.push(photo327);
users[3].photos.push(photo328);
users[4].photos.push(photo329);
users[2].photos.push(photo330);
users[0].photos.push(photo331);
users[1].photos.push(photo332);
users[3].photos.push(photo333);
users[4].photos.push(photo334);
users[2].photos.push(photo335);
users[1].photos.push(photo336);
users[1].photos.push(photo337);
users[1].photos.push(photo338);
users[1].photos.push(photo339);
users[2].photos.push(photo340);
users[0].photos.push(photo341);
users[1].photos.push(photo342);
users[3].photos.push(photo343);
users[4].photos.push(photo344);
users[2].photos.push(photo345);
users[0].photos.push(photo346);
users[1].photos.push(photo347);
users[3].photos.push(photo348);
users[4].photos.push(photo349);
users[2].photos.push(photo350);
users[0].photos.push(photo351);
users[1].photos.push(photo352);
users[3].photos.push(photo353);
users[4].photos.push(photo354);
users[2].photos.push(photo355);
users[0].photos.push(photo356);
users[1].photos.push(photo357);
users[3].photos.push(photo358);
users[4].photos.push(photo359);
users[0].photos.push(photo360);
users[1].photos.push(photo361);
users[1].photos.push(photo362);
users[1].photos.push(photo363);
users[1].photos.push(photo364);
users[2].photos.push(photo365);
users[0].photos.push(photo366);
users[1].photos.push(photo367);
users[2].photos.push(photo368);
users[2].photos.push(photo369);
users[2].photos.push(photo370);
users[2].photos.push(photo371);
users[2].photos.push(photo372);
users[2].photos.push(photo373);
users[2].photos.push(photo374);
users[3].photos.push(photo375);
users[3].photos.push(photo376);
users[3].photos.push(photo377);
users[3].photos.push(photo378);
users[3].photos.push(photo379);
users[0].photos.push(photo380);
users[1].photos.push(photo381);
users[2].photos.push(photo382);
users[3].photos.push(photo383);
users[0].photos.push(photo384);
users[0].photos.push(photo385);
users[2].photos.push(photo386);
users[1].photos.push(photo387);
users[0].photos.push(photo388);
users[2].photos.push(photo389);
users[1].photos.push(photo390);
users[0].photos.push(photo391);
users[2].photos.push(photo392);
users[3].photos.push(photo393);
users[2].photos.push(photo394);
users[2].photos.push(photo395);
users[0].photos.push(photo396);
users[3].photos.push(photo397);
users[2].photos.push(photo398);
users[1].photos.push(photo399);
users[1].photos.push(photo400);
users[0].photos.push(photo401);
users[0].photos.push(photo402);
users[0].photos.push(photo403);
users[1].photos.push(photo404);
users[3].photos.push(photo405);
users[4].photos.push(photo406);
users[2].photos.push(photo407);
users[2].photos.push(photo408);
users[2].photos.push(photo409);
users[0].photos.push(photo410);
users[0].photos.push(photo411);
users[3].photos.push(photo412);
users[3].photos.push(photo413);
users[2].photos.push(photo414);
users[3].photos.push(photo415);
users[2].photos.push(photo416);
users[0].photos.push(photo417);
users[0].photos.push(photo418);
users[0].photos.push(photo419);
users[0].photos.push(photo420);
users[1].photos.push(photo421);
users[3].photos.push(photo422);
users[4].photos.push(photo423);
users[2].photos.push(photo424);
users[0].photos.push(photo425);
users[1].photos.push(photo426);
users[3].photos.push(photo427);
users[4].photos.push(photo428);
users[2].photos.push(photo429);
users[1].photos.push(photo430);
users[3].photos.push(photo431);
users[4].photos.push(photo432);
users[2].photos.push(photo433);
users[3].photos.push(photo434);
users[4].photos.push(photo435);
users[2].photos.push(photo436);
users[0].photos.push(photo437);
users[1].photos.push(photo438);
users[3].photos.push(photo439);
users[4].photos.push(photo440);
users[2].photos.push(photo441);
users[1].photos.push(photo442);
users[3].photos.push(photo443);
users[4].photos.push(photo444);
users[4].photos.push(photo445);
users[2].photos.push(photo446);
users[0].photos.push(photo447);
users[1].photos.push(photo448);
users[3].photos.push(photo449);
users[4].photos.push(photo450);
users[2].photos.push(photo451);
users[1].photos.push(photo452);
users[3].photos.push(photo453);
users[4].photos.push(photo454);
users[4].photos.push(photo455);
users[2].photos.push(photo456);
users[0].photos.push(photo457);
users[1].photos.push(photo458);
users[3].photos.push(photo459);
users[4].photos.push(photo460);
users[2].photos.push(photo461);
users[1].photos.push(photo462);
users[3].photos.push(photo463);
users[4].photos.push(photo464);
users[4].photos.push(photo465);
users[2].photos.push(photo466);
users[0].photos.push(photo467);
users[1].photos.push(photo468);
users[3].photos.push(photo469);
users[4].photos.push(photo470);
users[2].photos.push(photo471);
users[1].photos.push(photo472);
users[3].photos.push(photo473);
users[4].photos.push(photo474);
users[4].photos.push(photo475);
users[2].photos.push(photo476);
users[0].photos.push(photo477);
users[1].photos.push(photo478);
users[3].photos.push(photo479);
users[4].photos.push(photo480);
users[2].photos.push(photo481);
users[1].photos.push(photo482);
users[3].photos.push(photo483);
users[4].photos.push(photo484);
users[0].photos.push(photo485);
users[1].photos.push(photo486);
users[3].photos.push(photo487);
users[4].photos.push(photo488);
users[2].photos.push(photo489);
users[1].photos.push(photo490);
users[3].photos.push(photo491);
users[4].photos.push(photo492);
users[2].photos.push(photo493);
users[0].photos.push(photo494);
users[1].photos.push(photo495);
users[3].photos.push(photo496);
users[4].photos.push(photo497);
users[2].photos.push(photo498);
users[1].photos.push(photo499);
users[3].photos.push(photo500);
users[4].photos.push(photo501);
users[4].photos.push(photo502);
users[2].photos.push(photo503);
users[0].photos.push(photo504);
users[1].photos.push(photo505);
users[3].photos.push(photo506);
users[4].photos.push(photo507);
users[2].photos.push(photo508);
users[1].photos.push(photo509);
users[3].photos.push(photo510);
users[4].photos.push(photo511);
users[4].photos.push(photo512);
users[2].photos.push(photo513);
users[0].photos.push(photo514);
users[1].photos.push(photo515);
users[3].photos.push(photo516);
users[4].photos.push(photo517);
users[2].photos.push(photo518);
users[1].photos.push(photo519);
users[3].photos.push(photo520);
users[4].photos.push(photo521);
users[4].photos.push(photo522);
users[2].photos.push(photo523);
users[0].photos.push(photo524);
users[1].photos.push(photo525);
users[3].photos.push(photo526);
users[4].photos.push(photo527);
users[2].photos.push(photo528);
users[1].photos.push(photo529);
users[3].photos.push(photo530);
users[4].photos.push(photo531);
users[4].photos.push(photo532);
users[2].photos.push(photo533);
users[0].photos.push(photo534);
users[1].photos.push(photo535);
users[3].photos.push(photo536);
users[4].photos.push(photo537);
users[2].photos.push(photo538);
users[1].photos.push(photo539);
users[3].photos.push(photo540);
users[4].photos.push(photo541);
users[2].photos.push(photo542);
users[1].photos.push(photo543);
users[3].photos.push(photo544);
users[4].photos.push(photo545);
users[2].photos.push(photo546);
users[1].photos.push(photo547);
users[3].photos.push(photo548);
users[4].photos.push(photo549);
users[2].photos.push(photo550);
users[1].photos.push(photo551);
users[3].photos.push(photo552);
users[4].photos.push(photo553);
users[2].photos.push(photo554);
users[4].photos.push(photo555);
users[2].photos.push(photo556);
users[1].photos.push(photo557);
users[3].photos.push(photo558);
users[4].photos.push(photo559);
users[2].photos.push(photo560);
users[0].photos.push(photo561);
users[1].photos.push(photo562);
users[3].photos.push(photo563);
users[4].photos.push(photo564);
users[2].photos.push(photo565);
users[4].photos.push(photo566);
users[2].photos.push(photo567);
users[1].photos.push(photo568);
users[3].photos.push(photo569);
users[4].photos.push(photo570);
users[2].photos.push(photo571);
users[0].photos.push(photo572);
users[1].photos.push(photo573);
users[3].photos.push(photo574);
users[4].photos.push(photo575);
users[2].photos.push(photo576);
users[0].photos.push(photo577);
users[1].photos.push(photo578);
users[3].photos.push(photo579);
users[4].photos.push(photo580);
users[2].photos.push(photo581);
users[0].photos.push(photo582);
users[3].photos.push(photo583);
users[4].photos.push(photo584);
users[2].photos.push(photo585);
users[1].photos.push(photo586);
users[0].photos.push(photo587);
users[3].photos.push(photo588);
users[4].photos.push(photo589);
users[2].photos.push(photo590);
users[1].photos.push(photo591);
users[3].photos.push(photo592);
users[4].photos.push(photo593);
users[2].photos.push(photo594);
users[0].photos.push(photo595);
users[3].photos.push(photo596);
users[1].photos.push(photo597);
users[4].photos.push(photo598);
users[2].photos.push(photo599);
users[3].photos.push(photo601);
users[2].photos.push(photo602);
users[1].photos.push(photo603);
users[0].photos.push(photo604);
users[3].photos.push(photo605);
users[2].photos.push(photo606);
users[1].photos.push(photo607);
users[0].photos.push(photo608);
users[2].photos.push(photo609);
users[1].photos.push(photo610);

//likes
const likes = [];

for (let i = 0; i < 31; i++) {
  let newLike = new Like({ photoId: photos[i % 20], likerId: users[i % 5] });
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
