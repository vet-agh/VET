// Importing the Schedule model

const Schedule = require('../models/scheduleModel')

// Loading mongoose package

const mongoose = require('mongoose')
const e = require('express')

// Get all appointments

const getSchedules = async (req, res) => {
  const schedules = await Schedule.find({}).sort({createdAt: -1})
  res.status(200).json(schedules)
}

// Get single appointment

const getSchedule = async (req, res) => {
  const { id } = req.params 

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: 'No appointment with given id.'})
  }

  const schedule = await Schedule.findById(id)

  if(!schedule) {
    return res.status(404).json({error: 'No appointment with given id.'})
  }

  res.status(200).json(schedule)
}

// Add new appointment

const addSchedule = async (req, res) => {
  const {data, czas_trwania_min, usluga, id_lekarza, id_klienta, id_pacjenta, id_kliniki} = req.body 

  // Adding document to database

  try {
    const schedule = await Schedule.create({data, czas_trwania_min, usluga, id_lekarza, id_klienta, id_pacjenta, id_kliniki})
    res.status(200).json(schedule)
  } catch (error) {
    res.status(400).json({error: error.message}) 
  }
}


//update a details about client
const updateSchedule = async (req,res) => {
  const { id } = req.params
  
  if(!mongoose.Types.ObjectId.isValid(id)){   
      return res.status(400).json({error:'No such appointment'})
  }
  const schedule = await Schedule.findOneAndUpdate({_id: id}, {
  ...req.body 
}) 

if(!schedule){
  return res.status(404).json({error:'No such appointment'})
}
res.status(200).json(schedule)
}
// Exports

module.exports = {
  getSchedules,
  getSchedule,
  addSchedule,
  updateSchedule
}
