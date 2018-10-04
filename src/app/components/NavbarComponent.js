import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Logo from './LogoComponent';
import ProfileIcon from './ProfileIcon';
import authenticate from '../actions/authActions';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { logout, authenticated } = this.props;
    return (
      <div className="header">
        <span className="logo left">
          <Link to="/">
            <Logo />
          </Link>
        </span>
        { authenticated ? (
          <div className="profile-icon right">
            <span className="text orange">
              <Link to="/" onClick={() => logout()}>Logout</Link>
            </span>
            <ProfileIcon />
          </div>)
          : false }
      </div>
    );
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout: () => (authenticate.logout()),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
