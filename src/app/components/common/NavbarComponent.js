import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import ProfileIcon from './ProfileIcon';

const Navbar = ({ profileIconVisibility }) => (
  <React.Fragment>
    <span className="logo left">
      <Link to="/">
        <Logo />
      </Link>
    </span>
    <div className={`profile-icon right ${profileIconVisibility}`}>
      <ProfileIcon />
    </div>
  </React.Fragment>
);

Navbar.propTypes = {
  profileIconVisibility: PropTypes.string.isRequired,
};

export default Navbar;
