const express = require("express");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");

const userRoute = express.Router();

// Route to create an account
userRoute.post("/signup", async (req, res) => {
  // console.log(req.body)
  const { username, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "Email already exists" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const newUser = new UserModel({ username, email, password: hash });
        await newUser.save();
        res.status(200).json({ msg: "New user has been registered" });
      });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Route for Login
userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          // Remove JWT token creation and response
          const userName = user.username;
          console.log(userName)
          res.status(200).json({ msg: "Login successful !!" ,username:userName});
        } else {
          res.status(400).json({ msg: "Password Mismatch !!" });
        }
      });
    } else {
      res.status(400).json({ msg: "Please create an account first !!" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = { userRoute };
