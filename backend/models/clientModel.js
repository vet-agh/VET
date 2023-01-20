const mongoose = require('mongoose')

const Schema = mongoose.Schema

//creating new Schema 
const clientSchema = new Schema({
    imie: {
        type: String,
        required: true
    },
    nazwisko: {
        type: String,
        required : true
    },
    numer_konta: {
        type: String
    }
},{timestamps:true}) //add data when doc were created
module.exports = mongoose.model('Client', clientSchema)


