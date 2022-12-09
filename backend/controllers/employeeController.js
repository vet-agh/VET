// Importing the Employee model

const Employee = require('../models/employeeModel')

// Loading mongoose package

const mongoose = require('mongoose')
const e = require('express')

// Get all employees

const getEmployees = async (req, res) => {
  const employees = await Employee.find({}).sort({createdAt: -1})
  res.status(200).json(employees)
}

// Get single employee

const getEmployee = async (req, res) => {
  const { id } = req.params 

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: 'No employee with given id.'})
  }

  const employee = await Employee.findById(id)

  if(!employee) {
    return res.status(404).json({error: 'No employee with given id.'})
  }

  res.status(200).json(employee)
}

// Add new employee

const addEmployee = async (req, res) => {
  const {imie, nazwisko, numer_telefonu, adres, numer_konta, id_kliniki} = req.body 

  // Adding document to database

  try {
    const employee = await Employee.create({imie, nazwisko, numer_telefonu, adres, numer_konta, id_kliniki})
    res.status(200).json(employee)
  } catch (error) {
    res.status(400).json({error: error.message}) 
  }
}

// Delete single employee

const deleteEmployee = async(req, res) => {
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "No employee with given id."})
  }

  const employee = await Employee.findOneAndDelete({_id: id})

  if(!employee) {
    return res.status(404).json({error: "No employee with given id."})
  }

  res.status(200).json(employee)
}

// Update single employee

const updateEmployee = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: 'No employee with given id.'})
  }

  const employee = await Employee.findByIdAndUpdate({_id: id}, {
    ...req.body
  })

  if(!employee) {
    return res.status(404).json({error: 'No employee with given id.'})
  }

  res.status(200).json(employee)
}


// Exports

module.exports = {
  addEmployee,
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee
}
