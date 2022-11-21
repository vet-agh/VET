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
  usluga: {
    type: String,
    required: true
  },
  id_budynku: {
    type: Number,
    required: true
  },
  nr_pokoju: {
    type: Number,
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
  }, 
  uwagi: {
    type: String,
    required: false
  }
}, {timestamps: true})

module.exports = mongoose.model('Schedule', scheduleSchema)