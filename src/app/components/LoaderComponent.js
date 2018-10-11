import React from 'react';
import loader from '../assets/img/loader.svg';
import '../assets/css/base.css';

/**
 * Renders the Loader component on a node in the DOM
 * @returns {object} the Loader component to render
 */
const Loader = () => (
  <div className="loader-container">
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  </div>
);

export default Loader;
