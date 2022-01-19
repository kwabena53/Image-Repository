require("dotenv").config();

const mongoose = require("mongoose");

const mongoUser = process.env.MONGODB_USER;
const mongoPass = process.env.MONGODB_PASSWORD;
const db = process.env.DB_MONGO;

const mongoURI = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.2whc7.mongodb.net/${db}?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  keepAlive: true,
  keepAliveInitialDelay: 360000,
  socketTimeoutMS: 360000,
};

const conn = mongoose.connect(mongoURI, options, (err) => {
  if (!err) {
    console.log("MongoDB connected to the database db");
  } else {
    console.log("Something went wrong with the Database Connection: " + err);
  }
});

require("./images.model");

exports.connection = conn;
