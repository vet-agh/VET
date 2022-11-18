const Client = require('../models/clientModel')

// Loading mongoose package
const mongoose = require('mongoose')
const { response, json } = require('express')


//get all clients
const getClients = async(req,res) => {
    const clients = await Client.find({}).sort({createdAt: -1}) //listing all of clients sorted by creating dates

    res.status(200).json(clients) //200 - resons = all ok
}


// get a single client 
const getClient = async(req,res) =>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such client'})
    }
    const client = await Client.findById(id)
    if(!client){
        return res.status(404).json({error:'No such client'})
    }
    res.status(200).json(client)
}

//create new client
const createClient = async(req,res) => {
    const {imie, nazwisko, numer_konta, id_pacjenta} = req.body
    //adding document to database
    try{
        const client = await Client.create({imie, nazwisko, numer_konta, id_pacjenta})
        res.status(200).json(client)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//Delete a client 
const deleteClient = async(req,res)=> {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){   //check if such id exists
        return res.status(404).json({error:'No such client'})
    }
    const client = await Client.findOneAndDelete({_id: id})
    
    if(!client){
        return res.status(400).json({error:'No such client'})
    }
    res.status(200).json(client)

    
}


//exporting function from clients.js
module.exports = {
    getClients,
    getClient,
    createClient,
    deleteClient
}
