const Client = require('../models/clientModel')
// Loading mongoose package
const mongoose = require('mongoose')


//get all clients
const getClients = async(req,res) => {
    const client = await Client.find({}).sort({createdAt: -1}) //listing all of clients sorted by creating dates

    res.status(200).json(workouts) //200 - resons = all ok
}
// get a single client 
const getClient = async(req,res) =>{
    const { id } = req.params
    const client = await Client.findById(id)
    if(!workout){
        return res.status(404),json({error:'No such client'})
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
//delete a workout 

//update a details about client


//exporting function from clients.js
module.exports = {
    getClients,
    getClient,
    createClient
}
