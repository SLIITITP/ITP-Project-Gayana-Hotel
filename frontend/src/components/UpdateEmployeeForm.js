import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Register the fonts with pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function UpdateEmployeeForm() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState(0);
  const [DOB, setDOB] = useState(0);
  const [address, setaddress] = useState(0);
  const [telephone, settelephone] = useState('');
  const [email, setemail] = useState('')

  useEffect(() => {
    // Fetch the employee details from the backend API
    axios.get(`/api/employees/${id}`)
      .then(response => {
        setEmployee(response.data);
        setfirstName(response.data.firstName);
        setlastName(response.data.lastName);
        setDOB(response.data.DOB);
        setaddress(response.data.address);
        settelephone(response.data.telephone);
        setemail(response.data.email)
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  function generatePdfReport(employee) {
    const documentDefinition = {
      content: [
        { text: 'Employee Details Report', style: 'header' },
        { text: 'First Name: ' + employee.firstName },
        { text: 'Last Name: ' + employee.lastName },
        { text: 'Date of Birth: ' + employee.DOB },
        { text: 'Address: ' + employee.address },
        { text: 'Telephone: ' + employee.telephone },
        { text: 'Email: ' + employee.email }
      ] };
      return documentDefinition;
    }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the updated employee details to the backend API
    axios.patch(`/api/employees/${id}`, { firstName, lastName, DOB, address, telephone, email })
      .then(response => {
        // Update the employee status with the updated details
        setEmployee(response.data);
        setfirstName(response.data.firstName);
        setlastName(response.data.lastName);
        setDOB(response.data.DOB);
        setaddress(response.data.address);
        settelephone(response.data.telephone);
        setemail(response.data.email);

        // Generate the PDF report and download it
        const pdfDocGenerator = pdfMake.createPdf(generatePdfReport(response.data));
        pdfDocGenerator.download('employee-details-report.pdf');
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className='container dashboard'>
    <div className='dashboard-app'>
      <div className='dashboard-content'>
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name :</label>
          <input type="text" value={firstName} onChange={e => setfirstName(e.target.value)} />
        </div>
        <div>                      
          <label>Last Name :</label>
          <input type="text" value={lastName} onChange={e => setlastName(e.target.value)} />
        </div>
        <div>
          <label>Date of Birth :</label>
          <input type="text" value={DOB} onChange={e => setDOB(e.target.value)} />
        </div>
        <div>
          <label>Address :</label>
          <input type="text" value={address} onChange={e => setaddress(e.target.value)} />
        </div>
        <div>
          <label>Telephone :</label>
          <input type="text" value={telephone} onChange={e => settelephone(e.target.value)} />
        </div>
        <div>
          <label>Email :</label>
          <input type="email" value={email} onChange={e => setemail(e.target.value)} />
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
        <button type="submit" class="btn btn-primary">Update Employee Details</button>
        </div>
      </form>
      {/* Display the updated employee details */}
      <div class="card" style={{ width: '18rem' }} >
      <h5 class="card text-center">Updated Employee Details</h5>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">First Name :{employee.firstName}</li>
      <li class="list-group-item">Last Name : {employee.lastName}</li>
      <li class="list-group-item">Date of Birth : {employee.DOB}</li>
      <li class="list-group-item">Address : {employee.address}</li>
      <li class="list-group-item">Telephone : {employee.telephone}</li>
      <li class="list-group-item">Email : {employee.email}</li>
      </ul>
      </div>
    </div>
    </div>
    </div>
    </div>

  );
}


export default UpdateEmployeeForm;

