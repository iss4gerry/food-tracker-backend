const httpStatus = require("http-status")
const profileService = require('../services/profile-service')
const { calculateAge } = require('../utils/dateUtils')
const { calculateCalories } = require('../utils/calorieCalculator')
const prisma = require("../../prisma")
const ApiError = require("../utils/apiError")
const { GoogleGenerativeAI } = require('@google/generative-ai')
const apiKey = 'AIzaSyB-PK8sGS-wximsCuYSAkFwPTfmPsirGZk'
const genAI = new GoogleGenerativeAI(apiKey)

const calorieTracker = async (userId) => {
    const id = userId.userId
    const user = await prisma.userProfile.findFirst({
        where: { userId: id }
    })
    const age = calculateAge(user.dateOfBirth)
    const calories = calculateCalories(user.gender, user.weight, user.height, age)
    const result = await prisma.calorie.create({
        data: {  userId: id, dailyCalorie: calories}
    })

    return result
}

const imageTracker = async (body) => {
    const data = {
        inlineData: body.image
    };
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const prompt = "What's picture is this?"

    console.log(data)
    const result = await model.generateContent([prompt, data])
    const response = await result.response
    const text = response.text()

    return text
}

module.exports = {
    calorieTracker,
    imageTracker
}