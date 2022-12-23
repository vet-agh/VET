const Patient = require('../models/patientModel')
const mongoose = require('mongoose')


const createPatient = async (req, res) => {
    const {imie, gatunek, rasa, id_klienta} = req.body

    try {
        const patient = await Patient.create({imie, gatunek, rasa, id_klienta})
        res.status(200).json(patient)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const getPatients = async(req, res) => {
    const patients = await Patient.find({}).sort({createdAt: -1})

    res.status(200).json(patients)
}


const getPatient = async(req, res) => {
    const{ id } = req.params

    const patient = await Patient.findById(id)

    if(!patient) {
        return res.status(404).json({error: 'No patient with given id.'})
    }

    res.status(200).json(patient)
}

const deletePatient = async(req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: "No patient with given id."})
    }
  
    const patient = await Patient.findOneAndDelete({_id: id})
  
    if(!patient) {
      return res.status(404).json({error: "No patient with given id."})
    }
  
    res.status(200).json(patient)
}


const updatePatient = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({error: "No patient with given id."})
    }
  
    const patient = await Patient.findByIdAndUpdate({_id: id}, {
      ...req.body
    })
  
    if(!patient) {
      return res.status(404).json({error: 'No patient with given id.'})
    }
  
    res.status(200).json(patient)
}

module.exports = {
    getPatients,
    getPatient,
    createPatient,
    deletePatient,
    updatePatient
}