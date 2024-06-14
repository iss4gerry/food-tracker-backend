const httpStatus = require("http-status")
const profileService = require('../services/profile-service')
const { calculateAge, parseDateString } = require('../utils/dateUtils')
const { calculateCalories } = require('../utils/calorieCalculator')
const prisma = require("../../prisma")
const ApiError = require("../utils/apiError")
const { GoogleGenerativeAI } = require('@google/generative-ai')
const apiKey = 'AIzaSyB-PK8sGS-wximsCuYSAkFwPTfmPsirGZk'
const genAI = new GoogleGenerativeAI(apiKey)

const calorieTracker = async (body) => {

    const userId = {
        userId: "7c143809-047a-4dba-9cea-67a023b4c4e3"
    }

    const nutrition = await prisma.nutrition.findFirst({
        where: { userId: userId.userId}
    })

    const update = parseDateString(nutrition.updatedAt)
    const today = parseDateString(new Date())
    if(update.toISOString() !== today.toISOString()){
        const userProfile = await prisma.userProfile.findFirst({
            where: { userId: userId.userId}
        })

        const { dateOfBirth, gender, weight, height } = userProfile
        const age = calculateAge(dateOfBirth)
        const calories = calculateCalories(gender, weight, height, age)

        await prisma.nutrition.update({
            where: {
                userId: userId.userId
            },
            data: {
                dailyCalorie: calories,
                dailyCarbohydrate: 0.15 * calories,
                dailySugar: 50,
                dailyFat: 0.2 * calories,
                dailyProtein: weight * 0.8
            }
        })

    }

    const data = {
        inlineData: body.image
    }
    
    const prompt = `Berdasarkan analisis gambar analisis nilai dibawah ini nilai tetap (tanpa menggunakan rentang) dan tanpa menggunakan satuan (misalnya gram, kkal, dll), kirim response dalam format json dibawah ini
    {
        "foodName": "{food_name}",
        "calorie": "{calorie_count_kkal}",
        "sugar": " "{sugar_content_grams}",
        "carbohydrate": "{carbohydrate_content_grams}"
        "fat": "{fat_content_grams}"
        "protein": "{protein_content_grams}"
    }
    ` 
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })
        const result = await model.generateContent([prompt, data])
        const response = await result.response
        const responseJson = await response.text()

        const { foodName, calorie, sugar, carbohydrate, fat, protein } = JSON.parse(responseJson)
        const foodInfo = {
            foodName,
            calorie,
            sugar,
            carbohydrate,
            fat,
            protein
        }

        await prisma.history.create({
            data: {
                userId: userId.userId,
                foodName: foodName,
                todalCalorie: calorie,
                totalCarbohydrate: carbohydrate,
                totalFat: fat,
                totalProtein: protein,
                totalSugar: sugar
            }
        })

    const recentNutrition = await prisma.nutrition.findFirst({
        where: {
            userId: userId.userId
        }
    })

    const { dailyCalorie, dailyCarbohydrate, dailyFat, dailyProtein, dailySugar } = recentNutrition

    const updateNutrition = await prisma.nutrition.update({
        where: {
            userId: userId.userId
        },
        data: {
            dailyCalorie: dailyCalorie - calorie,
            dailyCarbohydrate: dailyCarbohydrate - carbohydrate,
            dailyFat: dailyFat - fat,
            dailyProtein: dailyProtein - protein,
            dailySugar: dailySugar - sugar
        }
    })

    const resultData = {
        foodInfo: foodInfo,
        dailyNutritionLeft: updateNutrition,
    }

    console.log(resultData)
    return resultData
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