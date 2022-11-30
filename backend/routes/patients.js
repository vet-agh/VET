const express = require('express')


const Patient = require('../models/patientModel')


const router = express.Router()


const {
    createPatient,
    getPatient,
    getPatients,
    deletePatient
} = require('../controllers/patientController')
  
// POST patient
router.post('/', createPatient)

// GET all patients
router.get('/', getPatients)

// GET a single patient
router.get('/:id', getPatient) 

// DELETE patient
router.delete('/:id', deletePatient)



module.exports = router