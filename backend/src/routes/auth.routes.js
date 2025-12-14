const express = require('express')
const authController = require('../controllers/auth.controller')
const router  = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
// user API
router.post('/user/register',authController.registerUser )
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)
router.get('/user/profile', authController.profileUser)
router.get('/user/mylike',authMiddleware.authUserMiddleware,authController.myLikedVideo )

// FOOD PARTNER API
router.post('/food-partner/register',authController.registeredFoodPartner)
router.post('/food-partner/login',authController.foodpartnerLogin)
router.get('/food-partner/profileUser',authController.foodpartnerLogout)

router.get('/user/check',
    
    authController.checkAuthController)

module.exports = router;
