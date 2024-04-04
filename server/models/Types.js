const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Types = new Schema({
   type :{
      type : String,
      required : true
   }
})

module.exports = mongoose.model('Types', Types);