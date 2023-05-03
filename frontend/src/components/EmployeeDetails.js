import { useEmployeesContext } from '../hooks/useEmployeesContext'
import { useNavigate } from 'react-router-dom'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import isValid from 'date-fns/isValid'

const EmployeeDetails = ({ employee }) => {
  const { dispatch } = useEmployeesContext()
  const navigate = useNavigate()

  const createdAt = isValid(new Date(employee.createdAt)) ? new Date(employee.createdAt) : null

  const handleClick = async () => {
    const response = await fetch('/api/employees/' + employee._id, {
      method: 'DELETE',
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_EMPLOYEE', payload: json })
    }
  }

  const handleEmailClick = () => {
    window.location.href = `mailto:${employee.email}`
  }

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
    <div className="card text-center">
      <div className="employee-details">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>First Name: </strong>
            {employee.firstName}
          </li>
          <li className="list-group-item">
            <strong>Last Name: </strong>
            {employee.lastName}
          </li>
          <li className="list-group-item">
            <strong>Date of Birth: </strong>
            {employee.DOB}
          </li>
          <li className="list-group-item">
            <strong>Address: </strong>
            {employee.address}
          </li>
          <li className="list-group-item">
            <strong>Telephone: </strong>
            {employee.telephone}
          </li>
          <li className="list-group-item">
            <strong>Email: </strong>
            {employee.email}
          </li>
          {createdAt && (
            <li className="list-group-item">{formatDistanceToNow(createdAt, { addSuffix: true })}</li>
          )}

          <div className="d-grid gap-2 col-6 mx-auto">
          <button
              onClick={handleEmailClick}
              type="button" 
              class="btn btn-secondary"
            >
              Assign Task
            </button>
            <button
              onClick={() => navigate(`/update-employee/${employee._id}`)}
              class="btn btn-warning"
              type="button"
            >
              Update Details
            </button>
            <button
              onClick={handleClick}
              class="btn btn-danger"
              type="button"
            >
              Delete Details
            </button>

          </div>
        </ul>
      </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default EmployeeDetails
