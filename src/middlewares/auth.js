require('dotenv').config()

const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
const ApiError = require('../utils/apiError')

const secretKey = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please Authenticate'))
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded
        next()
    } catch (error) {
        return next(new ApiError(httpStatus.FORBIDDEN, 'Invalid Token'))
    }
};

module.exports = { verifyToken }