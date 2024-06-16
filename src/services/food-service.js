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
    try {
        
        const userId = "ea64b167-325b-49ed-9fea-fc920a1e7e74"

        const nutrition = await prisma.nutrition.findFirst({
            where: { userId: userId }
        }) 
    
        const update = parseDateString(nutrition.updatedAt)
        const today = parseDateString(new Date())
    
        if(update.toISOString() !== today.toISOString()){
            const userProfile = await prisma.userProfile.findFirst({
                where: { userId: userId}
            })
    
            const { dateOfBirth, gender, weight, height } = userProfile
            const age = calculateAge(dateOfBirth)
            const calories = calculateCalories(gender, weight, height, age)
    
            await prisma.nutrition.update({
                where: {
                    userId: userId
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

        const { base64Image } = body
        const inlineData = {
            data: base64Image,
            mimeType: 'image/jpeg'
        }
        
        const dataToSend = {
            inlineData
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
            const result = await model.generateContent([prompt, dataToSend])
            const response = await result.response
            const responseJson = await response.text()

            if(responseJson){
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
                        userId: userId,
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
                        userId: userId
                    }
                })

                const { dailyCalorie, dailyCarbohydrate, dailyFat, dailyProtein, dailySugar } = recentNutrition
                const updateNutrition = await prisma.nutrition.update({
                    where: {
                        userId: userId
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

                return resultData
            }
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
        }
 
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

const getAllHistory = async () => {
    return await prisma.history.findMany()
}

const getHistoryByUserId = async (userId) => {
    return await prisma.history.findMany({
        where: { userId: userId }
    })
}

const getDailyNutrition = async (userId) => {

    const nutrition = await prisma.nutrition.findFirst({
        where: { userId: userId }
    }) 

    const update = parseDateString(nutrition.updatedAt)
    const today = parseDateString(new Date())

    if(update.toISOString() !== today.toISOString()){
        const userProfile = await prisma.userProfile.findFirst({
            where: { userId: userId}
        })

        const { dateOfBirth, gender, weight, height } = userProfile
        const age = calculateAge(dateOfBirth)
        const calories = calculateCalories(gender, weight, height, age)

        await prisma.nutrition.update({
            where: {
                userId: userId
            },
            data: {
                dailyCalorie: calories,
                dailyCarbohydrate: 0.15 * calories,
                dailySugar: 50,
                dailyFat: 0.2 * calories,
                dailyProtein: weight * 0.8
            }
        })

        const newNutrition = await prisma.nutrition.findFirst({
            where: { userId: userId }
        })

        return newNutrition

    }

    return nutrition
}

module.exports = {
    calorieTracker,
    imageTracker,
    getAllHistory,
    getHistoryByUserId,
    getDailyNutrition
}