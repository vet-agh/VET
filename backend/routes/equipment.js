// Imports
// Express package

const express = require('express')

// Equipment model
const Equipment = require('../models/equipmentModel')

// Router objext to handle routes for equipment
const router = express.Router()

//Loading the equipmentController 
const {
    getEquipment,
    getSingleEquipment,
    addEquipment,
    deleteEquipment
} = require('../controllers/equipmentController')

// GET all equipment
router.get('/', getEquipment)

// GET SINGLE object from equipment
router.get('/:id', getSingleEquipment)

// POST a new object to equipment
router.post('/', addEquipment)

// DELETE object from equipment
router.delete('/:id', deleteEquipment)

// Export equipment routes to be used in server
module.exports = router