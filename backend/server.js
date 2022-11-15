// Imports

// Express Package

const express = require('express')


// Dotenv package

require('dotenv').config()

// Express app

const app = express()

// Listening for requests

app.listen(process.env.PORT , () => {
  console.log('Listening on port 4000')
})