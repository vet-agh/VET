// Imports

// Loading the equipmentController controller
const {
    getEquipment,
    getSingleEquipment,
    addEquipment,
    deleteEquipment,
    updateEquipment
} = require('../controllers/equipmentController')

// Express package
const express = require('express')

// Equipment model
const Equipment = require('../models/equipmentModel')

// Router objext to handle routes for equipment
const router = express.Router()

// Require authentication for all routes
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// Routes

// GET all equipment
router.get('/', getEquipment)

// GET SINGLE object from equipment
router.get('/:id', getSingleEquipment)

// POST a new object to equipment
router.post('/', addEquipment)

// DELETE object from equipment
router.delete('/:id', deleteEquipment)

// UPDATE object from equipment
router.patch('/:id', updateEquipment)

// Export equipment routes to be used in server
module.exports = router