const mongoose = require('mongoose')

const Schema = mongoose.Schema

const patientSchema = new Schema({
id_pacjenta: {
    type: Number,
    required: true
},
    imie: {
    type: String,
    required: true
},
gatunek: {
    type: String,
    required: true
},
rasa: {
    type: String,
},
id_wlasciciela: {
    type: Number,
    required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Patient', patientSchema)