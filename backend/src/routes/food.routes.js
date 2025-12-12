const express = require('express')
const router = express.Router();
const multer = require('multer')
const foodController = require('../controllers/food.controller')
const authMiddleware = require("../middlewares/auth.middleware")


const upload = multer({
    storage:multer.memoryStorage()
})

// TO CREATE THE FOOD ITEMS
router.post('/create-food',authMiddleware.authFoodPartnerMiddleware, 
    upload.single("videos"), 
    foodController.createFood);

//TO GET THE FEED TO THE USER
router.get('/get-Items',
    
    foodController.getFoodItems
)

router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood
)

router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
)

router.get('/save',
    authMiddleware.authUserMiddleware,
    foodController.getSavedFood
)

router.post('/comment',
    authMiddleware.authUserMiddleware,
    foodController.comments
)

router.get('/comment',
   
    foodController.getComments
)

router.get('/profile',
    authMiddleware.authFoodPartnerMiddleware,
    foodController.profileFood
)

module.exports = router