const express = require("express");
const { SupplierModel } = require("../models/supplierModel");
const { ProductModel } = require("../models/productModel");
const {authenticateUser} = require('../middleware/authentication')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const supplierRoute = express.Router();

// Route to create an account
supplierRoute.post("/signup", async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body;
  try {
    const user = await SupplierModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "Email already exists" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const newUser = new SupplierModel({ username, email, password: hash });
        await newUser.save();
        res.status(200).json({ msg: "New Supplier has been registered" });
      });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
// 2.Route for Login
supplierRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await SupplierModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            "masai"
          );
          res.status(200).json({ msg: "Login successful !!", token: token });
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
 
// 3. get only those products which added by supplier

supplierRoute.get('/', authenticateUser, async (req, res) => {
  try {  
      const supplierId = req.user.userId;
      // Find the supplier in the database
      const supplier = await SupplierModel.findById(supplierId);
      if (!supplier) {
          return res.status(404).json({ error: 'Supplier not found.' });
      }
      // Fetch products added by the supplier
      const products = await ProductModel.find({ supplier: supplierId });

      res.status(200).json({ products });
  } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = { supplierRoute };
