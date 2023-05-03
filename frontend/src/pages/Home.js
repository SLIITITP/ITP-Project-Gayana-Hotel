import React from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function Home() {
    const navigate = useNavigate(); 
    const images = [  "./IMGS/weddhallfront.jpg", "./IMGS/logome.jpg", "./IMGS/swim.jpg",  "./IMGS/college.jpg"  ,"./IMGS/swim.jpg"]; 
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: false
    };
  return (
    <div
    style={{
      backgroundImage: "",
      
    }}>
      <img src="./IMGS/topimage.jpg" alt="Description of your image" style={{ height: '350px' , width: '100%' }} />
      <h1><center><u>Celebrate life’s special moments with elegance and style</u></center></h1>
      <h4 style={{ textAlign: 'center', fontFamily: 'cursive', fontSize: '14px',  lineHeight: '1.5' }}>
  Celebrating a wedding with elegance and style means creating a magical and unforgettable experience for the bride, groom, and guests. It involves paying attention to every detail, from the choice of venue, to the decor, the food, and the music. The goal is to create an atmosphere of romance, beauty, and celebration that reflects the unique love story of the couple. This might involve choosing a venue with stunning natural surroundings or architectural features, selecting a color palette and floral arrangements that reflect the couple's taste and style, serving gourmet cuisine that is both delicious and visually appealing, and providing entertainment that sets the tone for a night of dancing and joy.
</h4>
<hr style={{ height: '5px', backgroundColor: 'yellow', border: 'none' }} />

      <div style={{ display: 'flex', alignItems: '' , marginBottom: '50px' }}>
        <img src="./IMGS/couple.jpg" alt="Description of your image" style={{ height: '250px', width: '50%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
          <p><h3>Wedding planning</h3>The tearful smiles of the walk down the aisle. 
            The first kiss as a couple. The celebrations that follow. Your wedding is a chance to craft moments that will last you a lifetime

            </p>
          <button style={{ 
  backgroundColor: 'Yellow', 
  color: 'black', 
  padding: '10px 20px', 
  borderRadius: '5px', 
  border: 'none',
  cursor: 'pointer'
}} onClick={() => navigate("/WorkoutForm")}>MORE</button>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: '', marginBottom: '50px'  }}>
        <img src="./IMGS/swim.jpg" alt="Description of your image" style={{ height: '250px', width: '55%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
          <p><h3>Banquet halls by Hotel gayana (graphical view)</h3>The tearful smiles of the walk down the aisle. 
            The first kiss as a couple. The celebrations that follow. Your wedding is a chance to craft moments that will last you a lifetime

            </p>
          <button style={{ 
  backgroundColor: 'yellow', 
  color: 'black', 
  padding: '10px 20px', 
  borderRadius: '5px', 
  border: 'none',
  cursor: 'pointer'
}} onClick={() => navigate("/graphicalview")}>MORE</button>
        </div>
        
      </div>
      <div style={{ display: 'flex', alignItems: '', marginBottom: '50px'  }}>
        <img src="./IMGS/headtable.jpg" alt="Description of your image" style={{ height: '250px', width: '55%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
          <p><h3>Request any proposal</h3>We provide fabulous event planning, 
          helping you to fulfil your aspirational dream. Our highly professional 
          concierge will have the honour to serve you after you completed the information.

            </p>
          <button style={{ 
  backgroundColor: 'yellow', 
  color: 'black', 
  padding: '10px 20px', 
  borderRadius: '5px', 
  border: 'none',
  cursor: 'pointer'
}}onClick={() => navigate("/anyprposal")}>MORE</button>
          
        </div>
        
      </div>
      <h2><center>WEDDING Inspirations</center></h2>
      <Slider {...settings}>
  {images.map((image) => (
    <div key={image}>
      <img src={image} alt="Description of your image" style={{ height: '150px', width: '50%' }} />
    </div>
  ))}
</Slider>
</div>   
  )
}

export default Home