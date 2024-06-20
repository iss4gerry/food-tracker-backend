const express = require('express')
const router = express.Router()
const auth  = require('../middlewares/auth')
const foodController = require('../controllers/food-controllers')

router
    .route('/nutrition/:userId').patch(foodController.calorieTracker).get(foodController.getDailyNutrition)

router
    .route('/nutrition/progress/:userId').get(foodController.getProgressNutrition)

router
    .route('/history').get(foodController.getAllHistory)

router
    .route('/history/:userId').get(foodController.getHistoryByUserId)
    
module.exports = router



