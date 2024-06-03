const httpStatus = require("http-status")
const prisma = require("../../prisma")
const ApiError = require("../utils/apiError")

const getProfile = async (userId) => {
    const result = await prisma.userProfile.findMany()

    if(!result){
        throw new ApiError(httpStatus.BAD_REQUEST, 'User Not Found')
    }

    return result
}

const createProfil = async (userBody) => {
    const result = await prisma.userProfile.create({
        data: userBody
    })

    return result
}

module.exports = {
    getProfile,
    createProfil
}