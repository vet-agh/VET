// Imports

// Mongoose package
const mongoose = require('mongoose')

// Schema constructor
const Schema = mongoose.Schema

// Creating new Schema object which defines the structure of document
const scheduleSchema = new Schema({
  data: {
    type: Date,
    default: Date.now, 
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
    type: Number,
    required: true
  },
  id_klienta: {
    type: Number,
    required: true
  },
  id_pacjenta: {
    type: Number,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Schedule', scheduleSchema)