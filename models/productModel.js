// SKU ID,Product Name,Description,Price,Image,Inventory,
// Color,Size,Brand  

const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    ProductName: {type:String},
    Description: {type:String},
    Price: {type:Number},  
    Image: {type:String},  
    Inventory: {type:String},  
    Color: {type:String},  
    Size: {type:String},  
    Color: {type:String},  
    Brand: {type:String},
    Category: {type:String},
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'supplier' },
    supplierName: { type: String },
    DosageForm: { type: String },
    ExpiryDate: { type: String }
});




const ProductModel=mongoose.model("product",productSchema)

module.exports={
    ProductModel
}

// {
//     "ProductName": "SuperTech Gadget",
//     "Description": "Cutting-edge technology in a compact device",
//     "Price": 79.99,
//     "Image": "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
//     "Inventory": 50,
//     "Color": "Silver",
//     "Size": "Medium",
//     "Brand": "TechPro Solutions"
//   }
