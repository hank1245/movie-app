const mongoose = require('mongoose');
const moment = require("moment");
const { Schema } = require('mongoose');

const userSchema = mongoose.Schema({
   userFrom:{
       type:Schema.Types.ObjectId,
       ref:'User'
   },
   movieId:{
       type:String
   },
   movieTitle:{
    type: String
   },
   moviePost:{
       type:String
   },
   movieRunTime:{
       type:String
   }
},{timeStamps: true})


const User = mongoose.model('User', userSchema);

module.exports = { User }