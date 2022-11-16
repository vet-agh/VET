// Imports
const {
    createClient,

} = require('../controllers/clientController')
// Express package
const express = require('express')

// Employee model
const Employee = require('../models/employeeModel')

// Router object to handle routes for employees

const router = express.Router()
//GET all clients
router.get('/',(req,res)=>{
    res.json({mssg: 'GET all clients'})
})
//GET a single client
router.get('/:id',(req,res)=>{
    res.json({mssg: 'GET a single client'})
})

//POST new client
router.post('/',createClient)

//DELETE a client 
router.delete('/:id', (req,res)=>{
    res.json({mssg:'DELETE a client'})
})

//UPDATE a client
router.patch('/:id',(req,res)=>{
    res.json({mssg: 'UPDATE a client'})
})