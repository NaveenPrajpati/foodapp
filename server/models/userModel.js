import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:String,
    phone:String,
    address:[String],
    email:String,
})

module.exports= mongoose.model('user',userSchema)