import React from 'react'
import logo from './logo.png'
import './Navbar.css'
import backdrop from './backdrop.jpg'
import Plx from 'react-plx'

function Navbar() {

  const parallaxData = [
    {
      start: 0,
      end: 4000,
      properties: [
        {
          startValue: 0,
          endValue: -1590,
          property: "translateX",
        },
      ],
    },
  ];

  return (
    <div className='main'>
      <div className='Navbar'>
        <Plx className="MyAwesomeParallax" parallaxData={parallaxData}>
          <img id='myBackdrop' className='Backdrop' style={{

          }} src={backdrop} alt='Backdrop' />
        </Plx>

        <div className='Navbar-component'>
          <img className='Logo' src={logo} alt="Grocerio Logo"></img>

          <p className='Login'>
            Shopkeeper01
          </p>
        </div>
      </div>
    </div>
  )
}

export default Navbar