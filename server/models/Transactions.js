const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Transactions = new Schema({
   startDate: {
      type: Date,
      required: true,
   },
   endDate: {
      type: Date,
      required: true,
   },
   user : {
      type : String,
      required : true,
   },
   status: {
      type: String,
      required: true,
      default : "Booked",
   },
   idHotel: {
      type: Schema.Types.ObjectId,
      required: true,
      ref : "Hotel"
   },
   numberRoom: {
      type: Array,
      required: true,
   },
   payMethod: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   phone: {
      type: Number,
      required: true,
   },
   cardNumber: {
      type: Number,
      required: true,
   },
   email : {
      type: String,
      required: true,
   }
},{timestamps : true});

module.exports = mongoose.model('Transaction', Transactions);
