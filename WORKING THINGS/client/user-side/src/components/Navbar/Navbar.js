import React from 'react'
import logo from './logo.png'
import './Navbar.css'
import backdrop from './backdrop.jpg'
import Plx from 'react-plx'
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom'


function Navbar() {

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

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
    <div className='Navbar-main'>
      <div className='Navbar'>
        <Plx className="MyAwesomeParallax" parallaxData={parallaxData}>
          <img id='myBackdrop' className='Backdrop' style={{

          }} src={backdrop} alt='Backdrop' />
        </Plx>

        <div className='Navbar-component'>
          <Link to='/'><img className='Logo' src={logo} alt="Grocerio Logo" /></Link>

          <ul className='Navbar-component-items'>
            <li><Link to='/shop'>Shop</Link></li>
          </ul>

          {
            isAuthenticated && <p>Welcome {'friend'}</p>
          }
          <div className='Login'>
            {
              isAuthenticated ? (<button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
              </button>) : (<button onClick={() => loginWithRedirect()}>Log In</button>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar