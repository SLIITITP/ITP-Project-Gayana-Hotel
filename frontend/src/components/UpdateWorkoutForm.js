import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


function UpdateWorkoutForm({}) {
  const { id } = useParams();
  const [workout, setWorkout] = useState({});
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState(0);
  const [reps, setReps] = useState(0);
  const [count, setCount] = useState(0);
  const [seating, setSeating] = useState('');
  

  useEffect(() => {
    // Fetch the workout details from the backend API
    axios.get(`/api/workouts/${id}`)
      .then(response => {
        setWorkout(response.data);
        setTitle(response.data.title);
        setLoad(response.data.load);
        setReps(response.data.reps);
        setCount(response.data.count);
        setSeating(response.data.seating);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);
  const sendEmail = (event) => {
    event.preventDefault();

    const emailData = {
      from:'it21469046@my.sliit.lk',
      to: 'nipunahe@gmail.com',
      subject: 'New workout details updated!',
      body: `The workout details have been updated. Here are the new details: \n\n
        Couple Name: ${title}\n
        Guest count: ${load}\n
        Menu: ${reps}\n
        Dessert: ${count}\n
        Seating: ${seating}`
    };

    // Send the email data to the backend API
    axios.post('/api/send-email', emailData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const generatePDF = () => {
    const documentDefinition = {
      content: [
        
        { text: 'Wedding Details ', style: 'header' },
        { text: `Couple Name: ${workout.title}` },
        { text: `Guest count: ${workout.load}` },
        { text: `Menu: ${workout.reps}` },
        { text: `Dessert: ${workout.count}` },
        { text: `Seating: ${workout.seating}` },
        { text: `Date: ${workout.date}` }
      ],
      styles: {
        header: {
          alignment: 'center',
          fontSize:30,
          bold: true
        }
      },
      footer: {
        columns: [
          { text: 'GAYANA HOTEL', alignment: 'left', margin: [20, 0] },
          { 
            text: 'Stay once, carry memories forever.',
            alignment: 'right',
            margin: [0, 0, 20, 0]
          }
        ]
      },
      header: {
        columns: [
          {text: 'GAYANA HOTEL', alignment: 'left', margin: [20, 0] },
          { 
            text: new Date().toLocaleString(),
            alignment: 'right',
            margin: [0, 0, 20, 0]
          }
        
        ]
      }
    };
    
  
    pdfMake.createPdf(documentDefinition).download('wedding-details.pdf');
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the updated workout details to the backend API
    axios.patch(`/api/workouts/${id}`, { title, load, reps, count, seating })
      .then(response => {
        // Update the workout state with the updated details
        setWorkout(response.data);
        setTitle(response.data.title);
        setLoad(response.data.load);
        setReps(response.data.reps);
        setCount(response.data.count);
        setSeating(response.data.seating);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <h2>Update Workout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Couple Name :</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Guest count:</label>
          <input type="number" value={load} onChange={e => setLoad(e.target.value)} />
        </div>
        <div>
          <label>Menu:</label>
          <input type="text" value={reps} onChange={e => setReps(e.target.value)} />
        </div>
        <div>
          <label>Dessert:</label>
          <input type="text" value={count} onChange={e => setCount(e.target.value)} />
        </div>
        <div>
          <label>Seating:</label>
          <input type="text" value={seating} onChange={e => setSeating(e.target.value)} />
        </div>
        <center><button type="submit">Update Your details Here! </button></center>
        
      
      {/* Display the updated workout details */}
      <h3>{workout.title}</h3>
      <p>Guest count:{workout.load}</p>
      <p>Menu: {workout.reps}</p>
      <p>Dessert: {workout.count}</p>
      <p>Seating: {workout.seating}</p>
      <p>Date: {workout.date}</p>
      <center> <button2 type="button" onClick={generatePDF}>Download PDF</button2></center>
      <button onClick={sendEmail}>Send Email</button>
      </form>
    </div>
    
    
  );
}


export default UpdateWorkoutForm;
 
             




 
             
