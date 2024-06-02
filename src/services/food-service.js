const httpStatus = require("http-status")
const prisma = require("../../prisma")
const ApiError = require("../utils/apiError")
const { GoogleGenerativeAI } = require('@google/generative-ai')
const apiKey = 'AIzaSyB-PK8sGS-wximsCuYSAkFwPTfmPsirGZk'
const genAI = new GoogleGenerativeAI(apiKey)

const calorieTracker = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    
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