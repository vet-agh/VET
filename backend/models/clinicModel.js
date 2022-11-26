const mongoose = require('mongoose')

const Schema = mongoose.Schema

//creating new Schema 
const clinicSchema = new Schema({
    nazwa: {
        type: String,
        required: true
    },
    adres: {
        type: String,
        required : true
    },
    numer_telefonu: {
        type: String,
        required : true
    }
},{timestamps:true})
module.exports = mongoose.model('Clinic', clinicSchema)

