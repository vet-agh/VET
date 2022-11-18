const Patient = require('../models/patientModel')
const mongoose = require('mongoose')


const createPatient = async (req, res) => {
    const {imie, gatunek, rasa, id_wlasciciela} = req.body

    try {
        const patient = await Patient.create({imie, gatunek, rasa, id_wlasciciela})
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
        return res.status(404).json({error: 'No such patient'})
    }

    res.status(200).json(patient)
}

module.exports = {
    createPatient,
    getPatients,
    getPatient
}