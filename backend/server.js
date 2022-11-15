// Imports

// Express Package

const express = require('express')

// Dotenv package

require('dotenv').config()

// Express app

const app = express()

// Routes for employees

const employeesRoutes = require('./routes/employees')

// Middleware to display requests in console

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Routes

app.use('/api/employees', employeesRoutes)

// Listening for requests

app.listen(process.env.PORT , () => {
  console.log('Listening on port 4000')
})