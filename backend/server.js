// Importing packages

// Express Package

const express = require('express')

// Mongoose package

const mongoose = require('mongoose')

// Dotenv package

require('dotenv').config()

// Express app

const app = express()

// Routes variable paths

const patientsRoutes = require('./routes/patients')
const employeesRoutes = require('./routes/employees')
const clientRoutes = require('./routes/clients')
const equipmentRoutes = require('./routes/equipment')
const scheduleRoutes = require('./routes/schedule')
const clinicRoutes = require('./routes/clinics')

// Middleware

// Display requests in console

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Attach data into the request

app.use(express.json())

// Routes

app.use('/api/patients', patientsRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/employees', employeesRoutes)
app.use('/api/equipment', equipmentRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/clinics', clinicRoutes)

// Connect to database and listen on port 4000

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to database')
  app.listen(process.env.PORT, () => {
    console.log('Listening for requests on port', process.env.PORT)
  })
})
.catch((err) => {
  console.log(err)
}) 