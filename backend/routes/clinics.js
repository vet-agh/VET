// Imports

// Loading the clinicsController controller
const {
    createClinic,
    getClinic,
    getClinics,
    deleteClinic,
    updateClinic
} = require('../controllers/clinicController')

// Express package
const express = require('express')

// Clinic model
const Clinic = require('../models/clinicModel')

const router = express.Router()

// Require authentication for all routes
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// Routes

// POST new clinic
router.post('/',createClinic)

// GET all clinics
router.get('/',getClinics)

// GET a single clinic
router.get('/:id',getClinic)

// DELETE a clinic 
router.delete('/:id', deleteClinic)

// UPDATE a clinic
router.patch('/:id', updateClinic)

module.exports = router