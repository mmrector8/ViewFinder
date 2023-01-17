const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Spot = require("../models/Spot")
const Location = require("../models/Location")
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

//Location 
const locations = [];


//Spots 

const spots = [];

for (let i = 0; i < 10; i++) {
  const latitude = (i+1.0) * 1000.0;
  const longitude = (i+1.0) * (-1000);
  const name = faker.address.city();
  const comments = [];
  const photos = [];
  spots.push(
    new Spot({
      latitude,
      longitude,
      name, 
      comments, 
      photos
    })
  )

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
    .then(() => User.insertMany(users))
    .then(() => Spot.insertMany(spots))
    .then(() => {
      console.log("done!");
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });

};
