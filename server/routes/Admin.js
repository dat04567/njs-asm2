const express = require("express");


const router = express.Router();
const adminController = require('../controller/Admin'); 


router.get('/getTopTransaction', adminController.getTopTransaction);

router.get('/getTransactions', adminController.getTransactions);

router.post('/deleteHotel', adminController.deleteHotel);

router.get('/getHotels', adminController.getHotels);

router.post('/getSingleHotel', adminController.getSingleHotel);

router.post('/postUpdateHotel', adminController.postUpdateHotel);

router.get('/getTitleHotels', adminController.getTitleHotels);

router.get('/getRooms', adminController.getRooms);

router.post('/postUpdateRoom', adminController.postUpdateRoom);

router.post('/deleteRoom', adminController.deleteRoom);

router.post('/getSingleRoom', adminController.getSingleRoom);


module.exports = router;