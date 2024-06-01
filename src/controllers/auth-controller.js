// const httpStatus = require('http-status')
// const authService = require('../services/auth-service')
// const catchAsync = require('../utils/catchAsync')

// const register = catchAsync(async (req, res) => {
//     const result = await authService.register(req.body)

//     res.status(httpStatus.OK).send({
//         status: httpStatus.OK,
//         message:  'Success',
//         data: result
//     })
// })

// const login = catchAsync(async (req, res) => {
//     const result = await authService.login(req.body.email, req.body.password, res)

//     res.status(httpStatus.OK).send({
//         status: httpStatus.OK,
//         message:  'Success',
//         data: result
//     })
// })

// module.exports = { 
//     register, 
//     login 
// }