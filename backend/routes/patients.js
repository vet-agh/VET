const express = require('express')


const Patient = require('../models/patientModel')


const router = express.Router()


const {
    createPatient,
    getPatient,
    getPatients,
} = require('../controllers/patientController')
  
// POST patient
router.post('/', createPatient)

// GET all patients
router.get('/', getPatients)

// GET a single patient
router.get('/:id', getPatient) 



module.exports = router