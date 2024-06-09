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
    // const nutrition = await prisma.nutrition.findFirst({
    //     where: { userId: userId.userId}
    // })

    // const update = parseDateString(nutrition.updatedAt)
    // const today = parseDateString(new Date())
    // if(update.toISOString() !== today.toISOString()){
    //     const userProfile = await prisma.userProfile.findFirst({
    //         where: { userId: userId.userId}
    //     })

    //     const { dateOfBirth, gender, weight, height } = userProfile
    //     const age = calculateAge(dateOfBirth)
    //     const calories = calculateCalories(gender, weight, height, age)

    //     await prisma.nutrition.update({
    //         where: {
    //             userId: userId.userId
    //         },
    //         data: {
    //             dailyCalorie: calories,
    //             dailyCarbohydrate: 0.15 * calories,
    //             dailySugar: 50,
    //             dailyFat: 0.2 * calories,
    //             dailyProtein: weight * 0.8
    //         }
    //     })
    // }


    // const recentNutrition = await prisma.nutrition.findFirst({
    //     where: {
    //         userId: userId.userId
    //     }
    // })
    const data = {
        inlineData: body.image
    };
    // const prompt = `
    // Berdasarkan analisis gambar analisis nilai dibawah ini dengan nilai fix(tidak boleh memakai rentang), 
    // - Nama makanan: {food_name} 
    // - Kandungan kalori: {calorie_count} (kalori)
    // - Kandungan gula: {sugar_content_grams} (gram)
    // - Kandungan karbohidrat: {carbohydrate_content_grams} (gram)
    // - Kandungan lemak: {fat_content} (gram)
    // - Kandungan protein: {protein_content_grams} (gram)
    // `

    const prompt = `Berdasarkan analisis gambar analisis nilai dibawah ini dengan nilai fix(tidak boleh memakai rentang) dan tidak pakai satuan (gram, kkal dll) hanya angkanya saja, kirim response dalam format json dibawah ini
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

        return foodInfo

    // const { dailyCalorie, dailyCarbohydrate, dailyFat, dailyProtein, dailySugar } = recentNutrition

    // const updateNutrition = await prisma.nutrition.update({
    //     where: {
    //         userId: userId.userId
    //     },
    //     data: {
    //         dailyCalorie: dailyCalorie
    //     }
    // })

    // return updateNutrition

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