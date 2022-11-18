// Importing packages


// Express Package

const express = require('express')

// Mongoose package

const mongoose = require('mongoose')

// Dotenv package

require('dotenv').config()

// Express app

const app = express()

// Middleware to display requests in console

app.use(express.json())

// Routes variable paths

const employeesRoutes = require('./routes/employees')
const clientRoutes = require('./routes/clients')

// Middleware

// Display requests in console

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Attach data into the request

app.use(express.json())

//Routes

app.use('/api/clients', clientRoutes)
app.use('/api/employees', employeesRoutes)

// Listening for requests

// Connect to database and listen on port 4000
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT , () => {
      console.log('Connected to database and listening on port 4000')
    })
  }) 
  .catch((error) => {
    console.log(error) 
  }) 