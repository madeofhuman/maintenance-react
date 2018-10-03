import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import Input from '../components/common/Input';
import authenticate from '../actions/authActions';
import Loader from '../components/common/Loader';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      firstName, lastName, email, password, confirmPassword,
    } = this.state;
    const { signup } = this.props;
    toastr.options.preventDuplicates = true;
    if (password !== confirmPassword) return toastr.error('passwords don\'t match');
    const user = {
      firstName, lastName, email, password,
    };
    return signup(user, null, 'signup');
  };

  render() {
    const {
      firstName, lastName, email, password, confirmPassword,
    } = this.state;
    const { handleClose, loading } = this.props;
    return (
      <React.Fragment>
        <div id="sign-up-form" className="form">
          <form id="signup-form" onSubmit={this.handleSubmit}>
            <span id="sign-up-form-close-btn" className="close-btn grey right" onClick={handleClose}>x</span>
            <p className="output white" />
            <Input
              type="text"
              name="firstName"
              label="First Name"
              id="first-name"
              value={firstName}
              handleChange={this.handleChange}
              isRequired="required"
            />
            <br /><br />
            <Input
              type="text"
              name="lastName"
              label="Last Name"
              id="last-name"
              value={lastName}
              handleChange={this.handleChange}
              isRequired="required"
            />
            <br /><br />
            <Input
              type="text"
              name="email"
              label="Email"
              id="signup-email"
              value={email}
              handleChange={this.handleChange}
              isRequired="required"
            />
            <br /><br />
            <Input
              type="password"
              name="password"
              label="Password"
              id="signup-password"
              value={password}
              handleChange={this.handleChange}
              isRequired="required"
            />
            <br /><br />
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              id="password-confirm"
              value={confirmPassword}
              handleChange={this.handleChange}
              isRequired="required"
            />
            <br /><br />
            <Input
              type="submit"
              value="Sign up"
              className="orange auth-submit-btn"
              id="signup-btn"
            />
          </form>
        </div>
        { loading ? <Loader /> : false }
      </React.Fragment>
    );
  }
}

SignupForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.common.loading,
  history: ownProps.history,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  signup: (user, history, route) => (authenticate.authenticate(user, history, route)),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
