const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cities = new Schema({
   city :{
      type : String,
      required : true
   }
})

module.exports = mongoose.model('Cities', Cities);