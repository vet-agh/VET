// Imports

// Express Package

const express = require('express')


// Dotenv package

require('dotenv').config()

// Express app

const app = express()

// Middleware to display requests in console

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Listening for requests

app.listen(process.env.PORT , () => {
  console.log('Listening on port 4000')
})