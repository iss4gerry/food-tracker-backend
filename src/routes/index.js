const express = require('express')
const router = express.Router()
const authRouter = require('./auth-route')
const foodRoute = require('./food-route')
const profileRoute = require('./profile-route')

const defaultRoutes = [
    {
        path: '/auth',
        route: authRouter,
    },
    {
        path: '/food',
        route: foodRoute
    },
    {
        path: '/profile',
        route: profileRoute
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router