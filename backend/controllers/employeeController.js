// const Workout = require('../models/employeeModel')
// const mongoose = require('mongoose')

// // get all employees
// const getEmployees = async (req, res) => {
//   const employees = await employees.find({}).sort({createdAt: -1})

//   res.status(200).json(employees)
// }

// // get a single employee
// const getEmployee = async (req, res) => {
//     const { id } = req.params
  
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No such an employee'})
//       }
    
//     const employee = await employee.findById(id)
  
//     if (!employee) {
//       return res.status(404).json({error: 'No such an employee'})
//     }
  
//     res.status(200).json(employee)
//   }

//   // create a new employee
// const createEmployee = async (req, res) => {
//     const { firstName, lastName, DOB, address, telephone} = req.body
  
//     let emptyFields = []
//     if (!firstName) {
//       emptyFields.push('firstName')
//     }
//     if (!lastName) {
//       emptyFields.push('lastName')
//     }
//     if (!DOB) {
//       emptyFields.push('DOB')
//     }
//     if (!address) {
//       emptyFields.push('address')
//     }
//     if (!telephone) {
//       emptyFields.push('telephone')
//     }

//     if (emptyFields.length > 0) {
//       return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
//     }
//     // add doc to the database
//     try {
//       const employee = await employee.create({firstName, lastName, DOB, address,telephone})
//       res.status(200).json(employee)
//     } catch (error) {
//       res.status(400).json({ error: error.message })
//     }
//   }

//   // delete an employee
//   const deleteEmployee = async (req, res) => {
//     const { id } = req.params
  
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({error: 'No such an employee'})
//     }
  
//     const employee = await employee.findOneAndDelete({_id: id})
  
//     if(!employee) {
//       return res.status(400).json({error: 'No such an employee'})
//     }
  
//     res.status(200).json(employee)
//   }

// // update an employee
// const updateEmployee = async (req, res) => {
//     const { id } = req.params
  
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({error: 'No such an employee'})
//     }
  
//     const employee = await Workout.findOneAndUpdate({_id: id}, {
//       ...req.body
//     })
  
//     if (!employee) {
//       return res.status(400).json({error: 'No such an employee'})
//     }
  
//     res.status(200).json(employee)
//   }
  

// module.exports = {
//   getEmployees,
//   getEmployee,
//   createEmployee,
//   deleteEmployee,
//   updateEmployee
// }

const Employee = require('../models/employeeModel')
const mongoose = require('mongoose')

// get all employees
const getEmployees = async (req, res) => {
  const employees = await Employee.find({}).sort({createdAt: -1})

  res.status(200).json(employees)
}

// get a single employee
const getEmployee = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({error: 'No such an employee'})
      }
    
    const employee = await Employee.findById(id)
  
    if (!employee) {
      return res.status(404).json({error: 'No such an employee'})
    }
  
    res.status(200).json(employee)
  }

  // create a new employee
const createEmployee = async (req, res) => {
    const { firstName, lastName, DOB, address, telephone, email} = req.body
  
    let emptyFields = []
    if (!firstName) {
     emptyFields.push('firstName')
    }
    if (!lastName) {
      emptyFields.push('lastName')
    }
    if (!DOB) {
      emptyFields.push('DOB')
    }
    if (!address) {
emptyFields.push('address')
    }
    if (!telephone) {
     emptyFields.push('telephone')
    }
    if (!email) {
      emptyFields.push('email')
     }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
    
    // add doc to the database
    try {
      const employee = await Employee.create({firstName, lastName, DOB, address,telephone, email})
      res.status(200).json(employee)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  // delete an employee
  const deleteEmployee = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such an employee'})
    }
  
    const employee = await Employee.findOneAndDelete({_id: id})
  
    if(!employee) {
      return res.status(400).json({error: 'No such an employee'})
    }
  
    res.status(200).json(employee)
  }

  // update an employee
const updateEmployee = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such an employee'})
  }

  try{
    const employee = await Employee.findOneAndUpdate({_id: id}, {
      ...req.body},{new: true, runValidators:true
      }
    )

  if (!employee) {
    return res.status(400).json({error: 'No such an employee'})
  }

  res.status(200).json(employee)
}catch(error){
  res.status(400).json({error:error.message})
}
}
  

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee
}
