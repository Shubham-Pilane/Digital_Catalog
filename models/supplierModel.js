const mongoose=require("mongoose")

const supplierSchema=mongoose.Schema({
    username: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},  
})
// {
//     "username" : "abc",
//     "email":"Shubham@123"
//     "password": "123"
// }

const SupplierModel=mongoose.model("supplier",supplierSchema)

module.exports={
    SupplierModel
}