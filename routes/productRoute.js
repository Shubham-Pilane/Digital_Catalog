const express = require("express");
const { ProductModel } = require("../models/productModel");
const {authenticateUser} = require('../middleware/authentication')
const mongoose=require("mongoose")

const productRoute = express.Router();

// 1. Get all products

productRoute.get("/", async (req, res) => {
    try {
      const products = await ProductModel.find();
      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });

// 2. Create a new product
productRoute.post("/add", authenticateUser, async (req, res) => {
  try {
    const supplierId = req.user.userId;
    const supplierName = req.user.username;
    console.log(supplierName)

    // Check if the request body contains a single product or an array of products
    if (Array.isArray(req.body)) {
      // If it's an array, iterate over each product and save them individually
      const products = req.body.map(product => ({
        ...product,
        supplier: supplierId,
        supplierName: supplierName
      }));

      const insertedProducts = await ProductModel.insertMany(products);

      res.status(201).json({ msg: "Products added successfully", products: insertedProducts });
    } else {
      // If it's a single product, save it as usual
      const newProduct = new ProductModel({
        ...req.body,
        supplier: supplierId,
        supplierName: supplierName
      });

      await newProduct.save();

      res.status(201).json({ msg: "Product added successfully", product: newProduct });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});


// productRoute.post("/add", authenticateUser, async (req, res) => {
//   try {
     
//       // console.log('req.user:', req.user);
//       const supplierId = req.user.userId;
//       const supplierName=req.user.username
//       console.log(supplierName)

//       // Create a new product with the supplier's ID
//       const newProduct = new ProductModel({
//           ...req.body,
//           supplier: supplierId,
//           username:supplierName
//       });

//       await newProduct.save();

//       res.status(201).json({ msg: "Product added successfully", product: newProduct });
//   } catch (error) {
//       res.status(400).json({ msg: error.message });
//   }
// });

  // 3. Update a product by ID
  productRoute.put("/update/:id", authenticateUser, async (req, res) => {
    try {
      const productId = req.params.id;
  
      // Validate that the provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ msg: 'Invalid product ID' });
      }
  
      // Check if the product exists before attempting to update
      const existingProduct = await ProductModel.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ msg: "Product not found" });
      }
  
      // Update only the specified fields in req.body
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        { $set: req.body },
        { new: true }
      );
  
      res.status(200).json({ msg: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
  });

// 4. Delete a product by ID
productRoute.delete("/delete/:id", authenticateUser, async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId)
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ msg: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// 5. Add/post multiple products at one time

productRoute.post("/addmultiple", authenticateUser, async (req, res) => {
  try {
      const productsToAdd = req.body; 

      if (!Array.isArray(productsToAdd) || productsToAdd.length === 0) {
          return res.status(400).json({ msg: 'Invalid array of products.' });
      }

      // Insert multiple products into the database
      const addedProducts = await ProductModel.insertMany(productsToAdd);

      res.status(201).json({ msg: "Products added successfully", products: addedProducts });
  } catch (error) {
      res.status(400).json({ msg: error.message });
  }
});

// 6 . Delete Multiple products at a time 
 
productRoute.delete("/deletemultiple", authenticateUser, async (req, res) => {
  try {
      const productIdsToDelete = req.body;
      if (!Array.isArray(productIdsToDelete) || productIdsToDelete.length === 0) {
          return res.status(400).json({ msg: 'Invalid array of product IDs.' });
      }

      // Delete multiple products from the database
      const deletedProducts = await ProductModel.deleteMany({ _id: { $in: productIdsToDelete } });

      res.status(200).json({ msg: "Products deleted successfully", deletedProducts });
  } catch (error) {
      res.status(400).json({ msg: error.message });
  }
});


  
  




module.exports = { productRoute };





// productRoute.post("/add",authenticateUser, async (req, res) => {
//   try {
//     const newProduct = new ProductModel(req.body);
//     // console.log(newProduct)
//     await newProduct.save();
//     res.status(201).json({ msg: "Product added successfully", product: newProduct });
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// });