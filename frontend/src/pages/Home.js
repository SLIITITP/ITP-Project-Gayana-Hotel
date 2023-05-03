import { useState, useEffect } from "react";
import { useEmployeesContext } from "../hooks/useEmployeesContext";
//components
import EmployeeDetails from "../components/EmployeeDetails";
import EmployeeForm from "../components/EmployeeForm";

const Home = () => {
  const { employees, dispatch } = useEmployeesContext();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch("/api/employees");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_EMPLOYEES", payload: json });
      }
    };

    fetchEmployees();
  }, [dispatch]);

  const filteredEmployees = employees?.filter(
    (employee) =>
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container dashboard'>
    <div className='dashboard-app'>
      <div className='dashboard-content'>
      <h2>Welcome To Employee Management System!</h2>
      <EmployeeForm />
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh' }}>
      <div className="searchBar" style={{ width: '34rem' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search employee by email address"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      </div>

      <div className="" style={{ width: '900px', height: '1000px', overflowY: 'scroll', overflowX:'scroll' }}>
        <h4 class="text-center">Employee Details List</h4>
        {employees &&
          filteredEmployees.map((employee) => (
            <EmployeeDetails employee={employee} key={employee._id} />
          ))}
     
      </div>
    </div>
    </div>
    </div>
  );
};

export default Home;
