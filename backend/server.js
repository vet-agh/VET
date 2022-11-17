// Imports

// Express Package

const express = require('express')

// Mongoose package

const mongoose = require('mongoose')

// Dotenv package

require('dotenv').config()

// Express app

const app = express()

// Routes for equipment

const equipmentRoutes = require('./routes/equipment')

// Middleware to display requests in console

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Attach data into the request

app.use(express.json())

// Routes

app.use('/api/equipment', equipmentRoutes)

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