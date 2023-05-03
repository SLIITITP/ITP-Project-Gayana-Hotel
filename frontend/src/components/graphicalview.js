
import React from 'react';

const graphicalview= () => {
    
  const data = [

    { id: 1, name: 'Guest Table', image: "./IMGS/g1.jpg" },
    { id: 2, name: 'Head Table', image: "./IMGS/g2.jpg" },
    { id: 3, name: 'Head Table2', image: "./IMGS/g3.jpg" },
    { id: 4, name: 'Decoration', image: "./IMGS/g4.jpg"},
    { id: 5, name: 'Hall view', image: "./IMGS/g5.jpg" },
    { id: 6, name: 'Menu', image: "./IMGS/g6.jpg" },
    { id: 7, name: 'Settee Back Design', image: "./IMGS/g7.jpg" },
    { id: 8, name: 'Hall view 2', image: "./IMGS/g8.jpg" },
    { id: 9, name: 'Front view1', image: "./IMGS/g9.jpg"},
    { id: 10, name: 'Front view2', image: "./IMGS/g10.jpg" },
    { id: 11, name: 'Front view3', image: "./IMGS/g11.jpg" },
  ];

  return (
    
    <div className="graphical-view">
    
         <h1 style={{textAlign: "center", color: "red"}}>      Our Banquet hall look like elegent "For every ceremony" ..... </h1> 
       
    {data.map((item) => (
      <div key={item.id} className="graphical-view__item">
        <div className="graphical-view__item-inner">
          <div className="graphical-view__item-image-container">
            <img src={item.image} alt={item.name} className="graphical-view__item-image" />
          </div>
          <div className="graphical-view__item-name">{item.name}</div>
        </div>
      </div>
    ))}
  </div>

         );
         };


export default graphicalview