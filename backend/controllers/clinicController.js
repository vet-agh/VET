const Clinic = require('../models/clinicModel')

const mongoose = require('mongoose')

const e = require('express')

// Get all clinics

const getClinics = async (req, res) => {
  const clinics = await Clinic.find({}).sort({createdAt: -1})
  res.status(200).json(clinics)
}

// Get a single clinic

const getClinic = async (req, res) => {
  const { id } = req.params 

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: 'No clinic with given id.'})
  }

  const clinic = await Clinic.findById(id)

  if(!clinic) {
    return res.status(404).json({error: 'No clinic with given id.'})
  }

  res.status(200).json(clinic)
}

// Add a new clinic

 const createClinic = async (req, res) => {
   const {nazwa, adres, numer_telefonu} = req.body 

   try {
     const clinic = await Clinic.create({nazwa, adres, numer_telefonu})
     res.status(200).json(clinic)
   } catch (error) {
     res.status(400).json({error: error.message}) 
   }
 }

// Delete a clinic

const deleteClinic = async(req, res) => {
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "No clinic with given id."})
  }

  const clinic = await Clinic.findOneAndDelete({_id: id})

  if(!clinic) {
    return res.status(404).json({error: "No clinic with given id."})
  }

  res.status(200).json(clinic)
}

// Update a clinic

const updateClinic = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: 'No clinic with given id.'})
  }

  const clinic = await Clinic.findByIdAndUpdate({_id: id}, {
    ...req.body
  })

  if(!clinic) {
    return res.status(404).json({error: 'No clinic with given id.'})
  }

  res.status(200).json(clinic)
}



module.exports = {
  createClinic,
  getClinic,
  getClinics,
  deleteClinic,
  updateClinic
}
