const express = require("express");


const router = express.Router();

const bookingController = require('../controller/Booking');

router.get('/quanlity', bookingController.getQuanlityForHotel);

router.get('/quantityByType', bookingController.getHotelQuantityByType);

router.get('/hotelForRating', bookingController.getHotelForRating);


router.get('/hotels/:hotelID', bookingController.getDetailsHotel);

router.post('/rooms', bookingController.postRooms);

router.post('/sumPrice', bookingController.postSumPrice);

router.get('/search', bookingController.searchHotels);


router.post('/trainsactions', bookingController.getTransactions);

router.post('/', bookingController.postBooking);



module.exports = router;