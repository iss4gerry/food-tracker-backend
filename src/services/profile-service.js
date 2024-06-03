const httpStatus = require("http-status")
const prisma = require("../../prisma")
const ApiError = require("../utils/apiError")

const getProfile = async () => {
    const result = await prisma.userProfile.findMany()

    return result
}

const createProfil = async (userBody) => {
    const result = await prisma.userProfile.create({
        data: userBody
    })

    return result
}

const getProfileById = async (userId) => {
    const result = await prisma.userProfile.findFirst({
        where: { id: userId }
    })

    if(!result){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Profile not found')
    }
    
    return result
}

module.exports = {
    getProfile,
    createProfil,
    getProfileById
}