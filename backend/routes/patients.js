// Imports

// Loading the patientsController controller
const {
    getPatients,
    getPatient,
    createPatient,
    deletePatient,
    updatePatient
} = require('../controllers/patientController')

// Express package
const express = require('express')

// Patient model
const Patient = require('../models/patientModel')

// Router object to handle routes for employees
const router = express.Router()

// Require authentication for all routes
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// Routes

// GET all patients
router.get('/', getPatients)

// GET single patient
router.get('/:id', getPatient) 

// POST patient
router.post('/', createPatient)

// DELETE patient
router.delete('/:id', deletePatient)

// PATCH employee
router.patch('/:id', updatePatient)

module.exports = router