
const mongoose = require("mongoose");
require("dotenv").config();
const connectionParams = {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
};
const uri = `mongodb+srv://nikhil:2fhrCWZIew3gB7K2@cluster0.qydar3s.mongodb.net/task?retryWrites=true&w=majority`;
const connexion = mongoose
  .connect(uri,connectionParams)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

module.exports = connexion;