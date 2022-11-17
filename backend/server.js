// Importing packages


// Express Package

const express = require('express')

// Routes for clients
const clientRoutes = require('./routes/clients')

// Mongoose package

const mongoose = require('mongoose')

// Dotenv package

require('dotenv').config()

// Express app

const app = express()

// Middleware to display requests in console
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api/clients',clientRoutes)

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