const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
   email : {
      type : String,
      required : true,
      index  : true,
      unique: true
   },
   password : {
      type : String,
      required : true
   },
   isAdmin : {
      type : Boolean,
   }
})

module.exports = mongoose.model('Users', User);