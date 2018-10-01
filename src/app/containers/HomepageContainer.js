import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Navbar from '../components/common/NavbarComponent';
import '../assets/css/home.css';
import wrenchHammer from '../assets/img/wrench-hammer.svg';
import backgroundImage from '../assets/img/gears.svg';

const Homepage = () => (
  <div className="wrapper">
    <div className="header">
      <Navbar profileIconVisibility="hidden" />
    </div>
    <div className="body" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="article left">
        <span className="icon">
          <img src={wrenchHammer} alt="icon" />
        </span>
        <span className="text right white">
          <h2>
            Nobody should have to live with broken things.
          </h2>
          <br />
          <p>
            We want to help you fix the things you love, and make sure the things that matter most to you, do not fall to pieces, so
            you can actually enjoy using them.
            <br /><br />
            We take great pride in our work and our ability to exceed customer expectation. You, the customer,
            are our greatest resource and we will treat you accordingly.
          </p>
        </span>
      </div>
      <div id="login-links" className="right">
        <span className="left link-btn">
          <span title="Sign in" className="white" id="sign-in-link">Sign in</span>
        </span>
        <span className="pipe white">
          |
        </span>
        <span className=" link-btn">
          <span title="Sign up" className="orange" id="sign-up-link">Sign up</span>
        </span>
      </div>
    </div>
  </div>
);

export default Homepage;
