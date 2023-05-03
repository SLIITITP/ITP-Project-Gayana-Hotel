const express = require('express')
const { createEmployee, getEmployees, getEmployee, deleteEmployee, updateEmployee} 
= require('../controllers/employeeController')

const router = express.Router()

// GET all employees
router.get('/', getEmployees)

// GET a single employee
router.get('/:id', getEmployee)

// POST a new employee
router.post('/', createEmployee)

// DELETE an employee
router.delete('/:id', deleteEmployee)
  
// UPDATE a workout
router.patch('/:id', updateEmployee)

module.exports = router
