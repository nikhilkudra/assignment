const mongoose = require("mongoose");
const {v4 : uuidv4} = require('uuid')
const schema = new mongoose.Schema(
  {
    email: "String",
    token: "String",
    password: "String",
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);
module.exports = User;