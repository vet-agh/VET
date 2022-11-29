// Imports

// Express package
const express = require('express')

// Schedule model
const Employee = require('../models/scheduleModel')

// Router object to handle routes for schedule
const router = express.Router()

// Loading the scheduleController Controller
const {
  getSchedules,
  getSchedule,
  addSchedule,
  updateSchedule
} = require('../controllers/scheduleController')

// routes

// GET all appointments
router.get('/', getSchedules)

// GET single appointment
router.get('/:id', getSchedule)  // Where :id is a router parameter

// POST appointment
router.post('/', addSchedule) 

//UPDATE appointment
router.patch('/:id', updateSchedule)

// Export schedule routes to be used in server
module.exports = router