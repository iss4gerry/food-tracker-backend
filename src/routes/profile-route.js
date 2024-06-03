const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile-controller')

router 
    .route('/').get(profileController.getProfile).post(profileController.createProfile)

router
    .route('/:userId').get(profileController.getProfileById)

module.exports = router