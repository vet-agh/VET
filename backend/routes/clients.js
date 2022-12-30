// Imports

// Loading the clientsController controller
const {
    createClient,
    getClient,
    getClients,
    deleteClient,
    updateClient
} = require('../controllers/clientController')

// Express package
const express = require('express')

// Client model
const Client = require('../models/clientModel')

// Router object to handle routes for employees
const router = express.Router()

// Require authentication for all routes
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// Routes

//GET all clients
router.get('/',getClients)

//GET a single client
router.get('/:id',getClient)

//POST new client
router.post('/',createClient)

//DELETE a client 
router.delete('/:id', deleteClient)

//UPDATE a client
router.patch('/:id', updateClient)

module.exports = router