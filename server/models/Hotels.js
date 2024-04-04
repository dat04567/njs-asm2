const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Hotel = new Schema({
   title : {
      type : String,
      require : true,
      text : true
   },
   name : {
      type : String,
      require : true,
   },
   type : {
      type : String,
      require : true
   },
   city : {
      type : String,
      require : true,
      text : true
   },
   address : {
      type : String,
      require : true
   },
   distance : {
      type : String,
      require : true
   },
   photos : {
      type : Array,
      require : true
   },
   desc : {
      type : String,
      require : true
   },
   rating :{
      type : Number,
      require : true,
      min :[0, "no should have minimum 10 digits"],
      max :[5, 'Rating must be lower than or equal to 5'],
      default : 0,
   },
   featured : {
      type : Boolean,
      require : true
   }, 
   rooms : {
      type : [ { type :  Schema.Types.ObjectId, ref : "Room"} ],
      require : true
   },
   cheapestPrice : {
      type : Number,
      require : true
   }
})

module.exports = mongoose.model('Hotel', Hotel);