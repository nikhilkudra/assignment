const express = require("express");
const message = require("./messages");
const userModel = require("./userModel");
const commonHelper = require("./commonHelper");
const jwt = require("jsonwebtoken");

const register = async (req) => {
  try {
    const { email, password } = req;
    let emailExist = await userModel.findOne({ email });

    if (emailExist) {
      return message.error.EMAIL_ALREADY_EXIST;
    }
    const userPassword = await commonHelper.generatePasswordHash(password);
    const user = new userModel({
      email: email,
      password: userPassword,
    });
    await user.save(user);
    return "User Registered successfully";
  } catch (e) {
    throw e;
  }
};

const login = async (req) => {
  const { email, password } = req;
  let user = await userModel.findOne({ email });

  if (!user) {
    throw message.error.USER_NOT_FOUND;
  }
  var passwordIsValid = await commonHelper.comparePasswordHash(
    password,
    user.password
  );
  if (!passwordIsValid) {
    return "Invalid Password!";
  }
  var token = jwt.sign(
    {
      id: user.id,
    },
    process.env.API_SECRET,
    {
      expiresIn: 86400,
    }
  );
  await userModel.findByIdAndUpdate(user._id, { token: token });
  return {
    userDetails: user,
    accessToken: token,
  };
};

const logout = async (id) => {
  const userId = id;

  try {
    await userModel.findByIdAndUpdate(userId, { token: null });
    return "Logout Successfylly !";
  } catch (e) {
    throw e;
  }
};

module.exports = {
  register,
  login,
  logout,
};
