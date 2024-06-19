const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const profileService = require('../services/profile-service')

const getProfile = catchAsync(async (req, res) => {
    const result = await profileService.getProfile()

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

const createProfile = catchAsync(async (req, res) => {
    const result = await profileService.createProfile(req.body)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

const getProfileById = catchAsync(async (req, res) => {
    const result = await profileService.getProfileById(req.params.userId)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

const updateProfile = catchAsync(async (req, res) => {
    const result = await profileService.updateProfile(req.params.profileId, req.body)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

const getTotalNutrition = catchAsync(async (req, res) => {
    const result = await profileService.getTotalNutrition(req.params.userId)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

module.exports = {
    getProfile,
    createProfile,
    getProfileById,
    updateProfile,
    getTotalNutrition
}