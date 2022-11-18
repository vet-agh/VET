// Imports

// Express package

const express = require('express')

// Employee model

const Employee = require('../models/employeeModel')

// Router object to handle routes for employees

const router = express.Router()

// Loading the employeeController Controller

const {
  addEmployee,
  getEmployees,
  getEmployee
} = require('../controllers/employeeController')

// routes

// GET all employees
router.get('/', getEmployees)

// GET single employee
router.get('/:id', getEmployee)  // Where :id is a router parameter

// POST employee
router.post('/', addEmployee) // Where :id is a router parameter

// Export employees routes to be used in server

module.exports = router