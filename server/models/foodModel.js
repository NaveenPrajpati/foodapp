import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:String,
    phone:String,
    address:String
})

module.exports= mongoose.model('user',userSchema)