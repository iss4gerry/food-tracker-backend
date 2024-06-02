const express = require('express')
const router = express.Router()
const auth  = require('../middlewares/auth')
const foodController = require('../controllers/food-controllers')

router
    .route('/').post(auth.verifyToken, foodController.imageTracker)

router
    .route('/history').get(auth.verifyToken, foodController.getFood)
    
module.exports = router



