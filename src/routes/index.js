const express = require('express')
const router = express.Router()
const authRouter = require('./auth-route')
const foodRoute = require('./food-route')

const defaultRoutes = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/food',
        route: foodRoute
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router