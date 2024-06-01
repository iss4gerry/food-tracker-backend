const express = require('express')
const router = express.Router()
const auth  = require('../middlewares/auth')
const foodController = require('../controllers/food-controllers')

router
    .route('/').get(foodController.getFood).post(foodController.calorieTracker)

module.exports = router



