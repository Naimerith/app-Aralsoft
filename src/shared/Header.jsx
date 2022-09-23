import React from 'react';
import '../assets/styles/Header.css';
import Logo from '../assets/img/logo.png';


const Header = () => {
  return (
    <div >
      {/* <!--Main Navigation--> */}
      <header>
        {/* <!-- Animated navbar--> */}
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll">
          <div className="container-fluid">
            <span
              className="navbar-toggler-icon d-flex justify-content-start align-items-center"
            >
              <i className="fas fa-bars"></i>
            </span>
            <div className="collapse navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>

              <div className="navbar-nav flex-end center">
                {/* <!-- Icons --> */}
                <p className='p'>Aralsoft</p>
                <img src={Logo} alt="" />
              </div>
            </div>
          </div>
        </nav>
        {/* <!-- Animated navbar --> */}

      </header>
    </div >
  )
}

export default Header;




