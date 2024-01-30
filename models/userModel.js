const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},  
})
// {
//     "username" : "abc",
//     "email":"Shubham@123"
//     "password": "123"
// }

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}