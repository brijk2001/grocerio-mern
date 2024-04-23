import './App.css';
import Navbar from './components/Navbar/Navbar';
import Carousel from './components/Carousel/Carousel';
import Footer from './components/Footer/Footer';
import React from 'react';
import Shop from './components/Shop/Shop';



function App() {

  return (
    <div className="App">
      <Navbar />
      <Shop />
      <Carousel className='Carousel'/>
      <Footer className='Footer'/>
    </div>
  );
}

export default App;
