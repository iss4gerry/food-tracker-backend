const express = require('express')
const router = express.Router()
const auth  = require('../middlewares/auth')
const foodController = require('../controllers/food-controllers')

router
    .route('/').post(foodController.imageTracker)

router
    .route('/calorie').get(foodController.getFood).put(foodController.calorieTracker)

router
    .route('/history').get(foodController.getAllHistory)

router
    .route('/history/:userId').get(foodController.getHistoryByUserId)
    
module.exports = router



