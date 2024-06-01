const httpStatus = require('http-status')
const catchAsync = require("../utils/catchAsync")
const foodService = require('../services/food-service')

const getFood = catchAsync(async (req, res) =>{
    res.status(httpStatus.OK).send({message: 'ya'})
})

const calorieTracker = catchAsync(async (req, res) => {
    const result = await foodService.calorieTracker(req.body.text)

    res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: 'Success',
        data: result
    })
})

module.exports = { 
    getFood, 
    calorieTracker 
}