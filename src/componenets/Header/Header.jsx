import React from 'react';
import './Header.css';


const Header = () => {
  return (
    <div className='header-container'>
      <img className='logo' src="/Doctives.png" alt="Logo" />
      <div className='coming-soon-content'>
        <img className='img-coming-soon' src="/Doctors-pana.png" alt="Doctors" />
        <div className='titles'>
          <h1 className='title-coming-soon'>We're Launching Soon</h1>
          <p className='des'>We're currently working hard on this page</p>
        </div>
      </div>

    </div>
  );
}

export default Header;
