
import React from 'react';

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <img src="" alt="" />
      </div>
      <div className="nav-mid">
        <ul>
          <li>Home</li>
          <li>Cars</li>
          <li>Booking</li>
          <li>My account</li>
        </ul>
      </div>
      <div className="nav-sign">
        <button>Sign In</button>
      </div>
    </nav>
  );
}

export default Navbar;