const mongoose = require('mongoose')
const bcrypt = require('bcrypt')        // Password encryption
const validator = require('validator')  // Email and password validation

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String, 
        require: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    // validation - check if all fields are filled
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    // validation - email check
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    // validation - password check
    // Params: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({email})

    if (exists) {
        throw Error('Email already in use')
    }

    // salt - randomly generated characters 
    const salt = await bcrypt.genSalt(10)

    // password saved as hashed password+salt - additional protection layer
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})

    return user
}

module.exports = mongoose.model('User', userSchema)