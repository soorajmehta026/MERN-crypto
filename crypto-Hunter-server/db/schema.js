import mongoose from "mongoose";


 export  const member= mongoose.model('member' , new mongoose.Schema({
    name:String,
    email:String,
    password:String
})) 

export const crypto=mongoose.model('watchlist',new mongoose.Schema({
    email: String,
  name: String,
  price: Number,
  quantity:Number,
  boughtAt: Number,
}))