// Imports

// Express package

const express = require('express')

// Employee model

const Employee = require('../models/employeeModel')

// Router object to handle routes for employees

const router = express.Router()

// Export employees routes to be used in server

module.exports = router