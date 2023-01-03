// Imports

// Loading the scheduleController controller
const {
  getSchedules,
  getSchedule,
  addSchedule,
  deleteSchedule,
  updateSchedule
} = require('../controllers/scheduleController')

// Express package
const express = require('express')

// Schedule model
const Employee = require('../models/scheduleModel')

// Router object to handle routes for schedule
const router = express.Router()

// Require authentication for all routes
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// Routes

// GET all appointments
router.get('/', getSchedules)

// GET single appointment
router.get('/:id', getSchedule)  // Where :id is a router parameter

// POST appointment
router.post('/', addSchedule) 

// DELETE appointment
router.delete('/:id', deleteSchedule)

// UPDATE appointment
router.patch('/:id', updateSchedule)

// Export schedule routes to be used in server
module.exports = router