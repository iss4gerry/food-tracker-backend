const httpStatus = require('http-status')
const prisma = require('../../prisma')
const ApiError = require('../utils/apiError')
const bcrypt = require('bcryptjs')
const tokenService = require('../services/token-service')

const existingUser = async (email) => {
    return await prisma.user.findUnique({
        where: { email }
    })
}

const register = async (userBody) => {
    const user = await existingUser(userBody.email)
    
    if(user){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }

    userBody.password = bcrypt.hashSync(userBody.password, 8)
    const result = await prisma.user.create({
        data: userBody
    })
    return result
}

const login = async (email, password, res) => {
    const user = await existingUser(email)
    if(!user){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
    }


    const token = tokenService.generateToken(user)
     
    res.json({token})
    return user 
}

module.exports = {
    existingUser, 
    register,
    login
}