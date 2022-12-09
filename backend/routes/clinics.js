
// Express package
const express = require('express')

// Clinic model
const Clinic = require('../models/clinicModel')

const router = express.Router()

 const {
     createClinic,
     getClinic,
     getClinics,
     deleteClinic,
     updateClinic

 } = require('../controllers/clinicController')
 
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