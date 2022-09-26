import React from 'react';
import '../assets/styles/Header.css';
import Logo from '../assets/img/logo.png';


const Header = () => {
  return (
    <div >
      <nav className="navbar navbar-expand-lg fixed-top navbar-scroll">
        <div className="container-fluid">
          <span>
            <i className="fas fa-bars"></i>
          </span>
          <img className='navbar-nav flex-end center' src={Logo} alt="" />
        </div>
      </nav>
    </div >
  )
}

export default Header;




