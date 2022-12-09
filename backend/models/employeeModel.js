// Imports

// Mongoose package

const mongoose = require('mongoose')

// Schema constructor

const Schema = mongoose.Schema

// Creating new Schema object which defines the structure of document

const employeeSchema = new Schema({
  imie: {
    type: String,
    required: true
  },
  nazwisko: {
    type: String,
    required: true
  },
  numer_telefonu: {
    type: String,
    required: true
  },
  adres: {
    type: String,
  },
  numer_konta: {
    type: String,     //bug fix - bank account can possibly start with zero
    required: true
  },
  id_kliniki: {
    type: String,
    required: true
  }

}, {timestamps: true})

module.exports = mongoose.model('Employee', employeeSchema)