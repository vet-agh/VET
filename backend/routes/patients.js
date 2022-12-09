const express = require('express')


const Patient = require('../models/patientModel')


const router = express.Router()


const {
    getPatients,
    getPatient,
    createPatient,
    deletePatient,
    updatePatient
} = require('../controllers/patientController')
  
// GET all patients
router.get('/', getPatients)

// GET single patient
router.get('/:id', getPatient) 

// POST patient
router.post('/', createPatient)

// DELETE patient
router.delete('/:id', deletePatient)

//PATCH employee
router.patch('/:id', updatePatient)


module.exports = router