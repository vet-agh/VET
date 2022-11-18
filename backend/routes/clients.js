// Imports

const {
    createClient,
    getClient,
    getClients,
    deleteClient

} = require('../controllers/clientController')

// Express package
const express = require('express')

// Client model
const Client = require('../models/clientModel')

// Router object to handle routes for employees
const router = express.Router()

//GET all clients
router.get('/',getClients)

//GET a single client
router.get('/:id',getClient)

//POST new client
router.post('/',createClient)

//DELETE a client 
router.delete('/:id', deleteClient)

module.exports = router