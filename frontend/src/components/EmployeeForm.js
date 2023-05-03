import { useState } from 'react'
import { useEmployeesContext } from '../hooks/useEmployeesContext'


const EmployeeForm = () => {
  const { dispatch } = useEmployeesContext()

  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [DOB, setDOB] = useState("")
  const [address, setaddress] = useState('')
  const [telephone, settelephone] = useState('')
  const [email, setemail] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault()

    const employee = { firstName,lastName,DOB,address,telephone,email}
    
    const response = await fetch('/api/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setfirstName('')
      setlastName('')
      setDOB('')
      setaddress('')
      settelephone('')
      setemail('')
      setError(null)
      setEmptyFields([])
      console.log('new employee added', json)
      dispatch({type: 'CREATE_EMPLOYEE', payload: json})
    }

  }

  return (
    <div className='container dashboard'>
    <div className='dashboard-app'>
      <div className='dashboard-content'>
    <div class="mb-3" style={{width:'52rem'}}>
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Employee</h3>

      <label>First Name:</label>
      <input 
        type="text" 
        onChange={(e) => setfirstName(e.target.value)} 
        value={firstName}
        className={emptyFields.includes('firstName')? 'error' : ''}
      />

    <label>Last Name:</label>
      <input 
        type="text" 
        onChange={(e) => setlastName(e.target.value)} 
        value={lastName}
        className={emptyFields.includes('lastName')? 'error' : ''}
      />

      <label>Date of Birth:</label>
      <input 
        type="text" 
        onChange={(e) => setDOB(e.target.value)} 
        value={DOB} 
        className={emptyFields.includes('DOB')? 'error' : ''}
      />

    <label>Address:</label>
      <input 
        type="text" 
        onChange={(e) => setaddress(e.target.value)} 
        value={address}
        className={emptyFields.includes('address')? 'error' : ''}
      />

    <label>Telephone:</label>
      <input 
        type="text" 
        onChange={(e) => settelephone(e.target.value)} 
        value={telephone}
        className={emptyFields.includes('telephone')? 'error' : ''}
      />

    <label>Email:</label>
      <input 
        type="email" 
        onChange={(e) => setemail(e.target.value)} 
        value={email}
        className={emptyFields.includes('email')? 'error' : ''}
      />

      <button
                   //onClick={() => navigate("/EmployeeDetails")}
                >Add Employee</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
    </div>
    </div>
    </div>
  )
}

export default EmployeeForm