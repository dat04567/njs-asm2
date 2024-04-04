const express = require("express");


const router = express.Router();
const authController = require('../controller/Auth'); 


router.post('/signUp', authController.postSignUp);

router.post('/login', authController.postLogin);

router.post('/loginAdmin', authController.postLoginAdmin);




module.exports = router;