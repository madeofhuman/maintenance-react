import React from 'react';
import loader from '../../assets/img/loader.svg';
import '../../assets/css/base.css';

const Loader = () => (
  <div className="loader-container">
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  </div>
);

export default Loader;
