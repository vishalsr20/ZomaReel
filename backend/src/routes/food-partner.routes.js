const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const foodPartnerController = require('../controllers/foodPartnerController')
router.get('/:id',
    
    foodPartnerController.getFoodItemsByPartner
)



module.exports = router