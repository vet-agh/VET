const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// JWT validation - creation of the token function (token expires in 3 days)
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login admin
const loginUser = async (req, res) => {
    res.json({mssg: 'login User'})
}

// signup admin
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)

        // create token
        const token = createToken(user._id) 

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signupUser}