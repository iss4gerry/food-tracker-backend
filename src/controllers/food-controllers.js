const httpStatus = require('http-status')
const catchAsync = require("../utils/catchAsync")
const foodService = require('../services/food-service')

const calorieTracker = catchAsync(async (req, res) => {
    const result = await foodService.calorieTracker(req.params.userId, req.body)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

const imageTracker = catchAsync(async (req, res) => {
    const result = await foodService.imageTracker(req.body)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})
 
const getAllHistory = catchAsync(async (req, res) => {
    const result = await foodService.getAllHistory()

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})
 
const getHistoryByUserId = catchAsync(async (req, res) => {
    const result = await foodService.getHistoryByUserId(req.params.userId)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

const getDailyNutrition = catchAsync(async (req, res) => {
    const result = await foodService.getDailyNutrition(req.params.userId)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

const getProgressNutrition = catchAsync(async (req, res) => {
    const result = await foodService.getProgressNutrition(req.params.userId)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

const deleteAllHistory = catchAsync(async (req, res) => {
    const result = await foodService.deleteAllHistory(req.params.userId)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

module.exports = { 
    calorieTracker,
    imageTracker,
    getAllHistory,
    getHistoryByUserId,
    getDailyNutrition,
    getProgressNutrition,
    deleteAllHistory
}