const httpStatus = require('http-status')
const catchAsync = require("../utils/catchAsync")
const foodService = require('../services/food-service')

const getFood = catchAsync(async (req, res) =>{
    res.status(httpStatus.OK).send('On Development')
})

const calorieTracker = catchAsync(async (req, res) => {
    const result = await foodService.calorieTracker(req.body)

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


module.exports = { 
    getFood, 
    calorieTracker,
    imageTracker
}