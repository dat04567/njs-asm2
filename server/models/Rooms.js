const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Room = new Schema({
   maxPeople : {
      type : Number,
      required : true
   },
   price : {
      type : Number,
      required : true
   },
   roomNumbers : {
      type: Array,
      required: true
   }, 
   desc :{
      type : String,
      required : true
   },
   title : {
      type : String,
      required : true,
      index  : true,
      unique: true
   }

}, {timestamps : true });

module.exports = mongoose.model('Room', Room);