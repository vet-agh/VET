// Imports

// Mongoose package
const mongoose = require('mongoose')

// Schema constructor
const Schema = mongoose.Schema

// Creating new Schema object which defines the structure of document
const equipmentSchema = new Schema ({
nazwa: {
	type: String,
	required: true
    },
    
kategoria: {
	type: String,
	required: true
    },

liczba_sprzetu: {
	type: Number,
	required: true
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Equipment', equipmentSchema)
