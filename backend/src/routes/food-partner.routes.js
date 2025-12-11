const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const foodPartnerController = require('../controllers/foodPartnerController')
router.get('/:id',
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodItemsByPartner
)

module.exports = router