const httpStatus = require("http-status")
const prisma = require("../../prisma")
const ApiError = require("../utils/apiError")
const { calculateAge } = require('../utils/dateUtils')
const { calculateCalories } = require('../utils/calorieCalculator')

const getProfile = async () => {
    const result = await prisma.userProfile.findMany()

    return result
}

const createProfile = async (userBody) => {

    try {
        const profile = await prisma.userProfile.create({
            data: userBody
        })  
    
        if(profile){
            const age = calculateAge(userBody.dateOfBirth)
            const calories = calculateCalories(userBody.gender, userBody.weight, userBody.height, age)
            const proteins = userBody.weight * 0.8
            const fat = 0.2 * calories
            const carbohydrate = (0.6 * calories)/4
            const sugar = 50
    
            const nutrition = await prisma.nutrition.create({
                data: {
                    userId: userBody.userId,
                    dailyCalorie: calories,
                    dailyCarbohydrate: carbohydrate,
                    dailySugar: sugar,
                    dailyFat: fat,
                    dailyProtein: proteins
                }
            })
    
            return {
                profile: profile,
                nutrition: nutrition
            }
        }else{
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Profile creation failed. Please try again.')
        }
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'An error occurred while creating the profile. Please try again.')
    }

}

const getProfileById = async (userId) => {
    const result = await prisma.userProfile.findFirst({
        where: { id: userId }
    })

    if(!result){
        throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
    }
    
    return result
}

module.exports = {
    getProfile,
    createProfile,
    getProfileById
}