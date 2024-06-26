const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile-controller')

router 
    .route('/').get(profileController.getProfile).post(profileController.createProfile)

router
    .route('/:userId').get(profileController.getProfileById).patch(profileController.updateProfile)

router 
    .route('/nutrition/:userId').get(profileController.getTotalNutrition)

module.exports = router