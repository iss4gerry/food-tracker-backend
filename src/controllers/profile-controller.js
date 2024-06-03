const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const profilService = require('../services/profile-service')

const getProfile = catchAsync(async (req, res) => {
    const result = await profilService.getProfile()

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

const createProfile = catchAsync(async (req, res) => {
    const result = await profilService.createProfile(req.body)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

const getProfileById = catchAsync(async (req, res) => {
    const result = await profilService.getProfileById(req.params.profilId)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

module.exports = {
    getProfile,
    createProfile,
    getProfileById
}