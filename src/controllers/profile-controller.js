const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const profilService = require('../services/profile-service')

const getProfile = catchAsync(async (req, res) => {
    const result = await profilService.getProfile(req.params.id)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

const createProfil = catchAsync(async (req, res) => {
    const result = await profilService.createProfil(req.body)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

module.exports = {
    getProfile,
    createProfil,
}