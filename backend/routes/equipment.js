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
} = require('../controllers/equipmentController')

// GET all equipment
router.get('/', getEquipment)

// GET SINGLE object from equipment
router.get('/', getSingleEquipment)

// POST a new object to equipment
router.get('/', addEquipment)

// DELETE object from equipment
router.get('/', deleteEquipment)

// UPDATE object from equipment
router.get('/', updateEquipment)


// Export equipment routes to be used in server
module.exports = router