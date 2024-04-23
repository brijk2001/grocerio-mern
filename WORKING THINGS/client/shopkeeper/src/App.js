import React, { useState } from "react";
import Navbar from "./Components/navbar/Navbar";
import DisplayProducts from "./Components/displayProducts/DisplaProducts";
import Form from './Components/Form/SendData';
import DisplayOrder from "./Components/displayOrder/DisplaProducts";
import './App.css';

function App() {
  // State to manage form display
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Function to handle opening or closing the form
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  }


  return (
    <div className="App">
      <Navbar />
      <canvas style={{ height: "150px", width: '100%' }}></canvas>

      <DisplayProducts />


      {/* Button to toggle form display */}
      <button onClick={toggleForm} className='Load'>{isFormOpen ? "- Close Form" : "+ Add Product"}</button>
      {/* Render the form only if isFormOpen is true */}
      <div className="myForm">
        {isFormOpen && <Form onClosed={toggleForm} />}
      </div>

      <DisplayOrder />
    </div>
  );
}

export default App;
