require('dotenv').config()

const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET

const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }
    return jwt.sign(payload, secretKey, { expiresIn: '1h' })
}

module.exports = { generateToken }
