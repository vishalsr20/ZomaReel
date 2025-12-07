const express = require('express')
const authController = require('../controllers/auth.controller')
const router  = express.Router();

// user API
router.post('/user/register',authController.registerUser )
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)


// FOOD PARTNER API
router.post('/food-partner/register',authController.registeredFoodPartner)
router.post('/food-partner/login',authController.foodpartnerLogin)
router.get('/food-partner/logout',authController.foodpartnerLogout)

module.exports = router;
