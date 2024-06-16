const express = require('express')
const router = express.Router()
const auth  = require('../middlewares/auth')
const foodController = require('../controllers/food-controllers')

router
    .route('/nutrition').patch(foodController.calorieTracker)

router
    .route('/nutrition/:userId').get(foodController.getDailyNutrition)

router
    .route('/history').get(foodController.getAllHistory)

router
    .route('/history/:userId').get(foodController.getHistoryByUserId)
    
module.exports = router



