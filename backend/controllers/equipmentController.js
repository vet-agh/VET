// Importing the Equipment model
const Equipment = require('../models/equipmentModel')

// Loading mongoose package
const mongoose = require('mongoose')
const e = require('express')

// Get all equipment
const getEquipment = async(req,res) => {
    const equipment = await Equipment.find({}).sort({createdAt: -1})   // using method find to get all objects, then sort it descending by created date
    res.status(200).json(equipment)
}

// Get single object from equipment
const getSingleEquipment = async(req,res) => {
    const { id } = req.params                                              // grabing id from the route parameter

    if (!mongoose.Types.ObjectId.isValid(id)){                                                //method to check if the id is valid
        return res.status(400).json({error: 'No object in equipment registry with given id'}) // if it's not valid it returns response with error message
    }

    const equipment = await Equipment.findById(id)  // method to finding object by id
 
    if(!equipment){                            // if there is no object by given id we use if statement and we send back error message
        return res.status(404).json({error:'No object in equipment registry with given id'})
    }

    res.status(200).json(equipment)          // sending response with 200 code, what means that we found object with given id
}

// Add new object to equipment (Add doc to DB)
const addEquipment = async(req,res) => {
    const {nazwa, kategoria, liczba_sprzetu} = req.body // grabbing properties from req.body
    try {
        const equipment = await Equipment.create({nazwa, kategoria, liczba_sprzetu}) // trying to create new object in Equipment
        res.status(200).json(equipment) // returning that equipment is json
    } 
    catch(error) {                                          // catching the erorr if it's any  
        res.status(400).json({error: error.message})   // returning an error message
    }
}

 // exporting functions
module.exports = {
    getEquipment,
    getSingleEquipment,
    addEquipment
}