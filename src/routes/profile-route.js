const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile-controller')

router 
    .route('/').get(profileController.getProfile).post(profileController.createProfil)


module.exports = router