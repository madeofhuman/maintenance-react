import React from 'react';
import Navbar from '../components/NavbarComponent';
import '../assets/css/404.css';

export const NotFound = () => (
  <React.Fragment>
    <div className="wrapper">
      <Navbar />
      <div className="body" style={{ backgroundImage: "url('../assets/img/gears.svg')" }}>
        <div className="wrapper white">
          <h1 className="center" id="four-o-four-message">
            <span role="img" aria-label="sad face">😢</span><br />Nothing exists here.
          </h1>
          <em className="center" id="back-btn" onClick={() => (window.history.back())}>&lt;&nbsp;&nbsp;Go Back</em>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default NotFound;
