// require('dotenv').config()

// const jwt = require('jsonwebtoken')
// const httpStatus = require('http-status')
// const ApiError = require('../utils/apiError')

// const secretKey = process.env.JWT_SECRET

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.token

//     if(!token){
//         return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please Authenticate'))
//     }

//     try {
//         const decoded = jwt.verify(token, secretKey)
//         req.user = decoded
//         next()
//     } catch (error) {
//         return next(new ApiError(httpStatus[403], 'Invalid Token'))
//     }

// }

// module.exports = { verifyToken }