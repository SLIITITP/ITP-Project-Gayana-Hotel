// import { useState } from 'react'
// import { useEmployeesContext } from '../hooks/useEmployeesContext'


// const EmpForm = () => {
//   const { dispatch } = useEmployeesContext()

//   const [email, setemail] = useState('')
//   const [password, setpassword] = useState('')
//   const [error, setError] = useState(null)
//   const [emptyFields, setEmptyFields] = useState([])
//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const employee = { email, password }
    
//     const response = await fetch('/api/employees', {
//       method: 'POST',
//       body: JSON.stringify(employee),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     const json = await response.json()

//     if (!response.ok) {
//       setError(json.error)
//       setEmptyFields(json.emptyFields || []) // Initialize emptyFields as an empty array
//     }
//     if (response.ok) {
//       setemail('')
//       setpassword('')
//       setError(null)
//       setEmptyFields([])
//       dispatch({ type: 'CREATE_EMPLOYEE', payload: json })
//     }

//   }

//   return (
//     <form className="create" onSubmit={handleSubmit}> 
//       <h3>Login to Employee Management System</h3>

//       <label>Enter your Email:</label>
//       <input 
//         type="email" 
//         onChange={(e) => setfirstName(e.target.value)} 
//         value={email}
//         className={emptyFields.includes('email')? 'error' : ''}
//       />

//       <label>Enter Password:</label>
//       <input 
//         type="password" 
//         onChange={(e) => setemail(e.target.value)} 
//         value={password}
//         className={emptyFields.includes('password')? 'error' : ''}
//       />

//       <button>Login</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   )
// }

// export default EmpForm
