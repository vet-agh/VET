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
    const {nazwa, kategoria, liczba_sprzetu, id_kliniki} = req.body // grabbing properties from req.body
    try {
        const equipment = await Equipment.create({nazwa, kategoria, liczba_sprzetu, id_kliniki}) // trying to create new object in Equipment
        res.status(200).json(equipment) // returning that equipment is json
    } 
    catch(error) {                                          // catching the erorr if it's any  
        res.status(400).json({error: error.message})   // returning an error message
    }
}
// Delete existing object from equipment
const deleteEquipment = async(req,res) => {
    const{ id } = req.params                    

    if (!mongoose.Types.ObjectId.isValid(id)){                                                //method to check if the id is valid
        return res.status(400).json({error: 'No object in equipment registry with given id'}) // if it's not valid it returns response with error message
    }
    const equipment = await Equipment.findOneAndDelete({_id:id}) //method to deleting object by given id
     
    if(!equipment){                            // if there is no object by given id we use if statement and we send back error message
        return res.status(404).json({error:'No object in equipment registry with given id'})
    }
    res.status(200).json(equipment)   // if it finds id, it send back json with object we just deleted
 }

  // Updating existing object from equipment
  const updateEquipment = async(req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){                                                //method to check if the id is valid
        return res.status(400).json({error: 'No object in equipment registry with given id'}) // if it's not valid it returns response with error message
    }

    const equipment = await Equipment.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!equipment){                            // if there is no object by given id we use if statement and we send back error message
        return res.status(404).json({error:'No object in equipment registry with given id'})
    }

    res.status(200).json(equipment)   // if it finds id, it send back json with object we just updated

 }
 

 // exporting functions
module.exports = {
    getEquipment,
    getSingleEquipment,
    addEquipment,
    deleteEquipment,
    updateEquipment
}