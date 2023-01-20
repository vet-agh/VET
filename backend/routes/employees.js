// Imports

// Loading the employeeController controller
const {
  addEmployee,
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee
} = require('../controllers/employeeController')

// Express package
const express = require('express')

// Employee model
const Employee = require('../models/employeeModel')

// Router object to handle routes for employees
const router = express.Router()

// Require authentication for all routes
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// Routes

// GET all employees
router.get('/', getEmployees)

// GET single employee
router.get('/:id', getEmployee)  // Where :id is a router parameter

// POST employee
router.post('/', addEmployee)

// DELETE employee
router.delete('/:id', deleteEmployee)

// PATCH employee
router.patch('/:id', updateEmployee)

// Export employees routes to be used in server

module.exports = router