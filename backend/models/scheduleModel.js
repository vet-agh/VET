// Imports

// Mongoose package
const mongoose = require('mongoose')

// Schema constructor
const Schema = mongoose.Schema

// Creating new Schema object which defines the structure of document
const scheduleSchema = new Schema({
  data: {
    type: Date,
    required: true
  },
  czas_trwania_min: {
    type: Number, 
    required: true
  },
  usluga: {
    type: String,
    required: true
  },
  id_lekarza: {
    type: String,     //changing all id's to string in order to match mongo _id
    required: true
  },
  id_klienta: {
    type: String,
    required: true
  },
  id_pacjenta: {
    type: String,
    required: true
  },
  id_kliniki: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Schedule', scheduleSchema)