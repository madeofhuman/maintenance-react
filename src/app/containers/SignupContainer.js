import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import Input from '../components/InputComponent';
import authActions from '../actions/authActions';
import commonActions from '../actions/commonActions';
import Loader from '../components/LoaderComponent';
import utils from '../assets/js/utils';

/**
 * Manages the state and actions of the Signup Form Component
 * @class
 * @extends React.Component
 */
export class SignupForm extends Component {
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

  /**
   * Updates the value of the item in the form state with the value of their bound
   * DOM elements when the DOM elements change
   */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Calls the signup action creator to sign the user up,
   * and redirects to their dashboard on successful signup
   * or toasts an error otherwise
   */
  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      firstName, lastName, email, password, confirmPassword,
    } = this.state;
    const { signup } = this.props;
    if (password !== confirmPassword) return toastr.error('passwords don\'t match');
    const userDetail = {
      firstName, lastName, email, password,
    };
    await signup(userDetail, 'signup');
    const {
      user, history, error, message, clearMessages,
    } = this.props;
    utils.handleLogin(user, history, error, message, clearMessages);
  };

  /**
   * Renders the Signup Form component on a node in the DOM
   */
  render() {
    const {
      firstName, lastName, email, password, confirmPassword,
    } = this.state;
    const { handleClose, loading } = this.props;
    return (
      <React.Fragment>
        <div id="sign-up-form" className="auth-form">
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

SignupForm.defaultProps = {
  user: undefined,
  error: undefined,
  message: undefined,
};

SignupForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  signup: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.shape({}),
  message: PropTypes.string,
  error: PropTypes.string,
  clearMessages: PropTypes.func.isRequired,
};

/**
 * Add specified items in the global store as props to the component
 * @param {object} state the global store
 * @param {object} ownProps the component specific props
 */
const mapStateToProps = (state, ownProps) => ({
  loading: state.common.loading,
  history: ownProps.history,
  user: state.auth.user,
  message: state.common.message,
  error: state.common.error,
});

/**
 * Add specified action creators as props to the component
 * @param {function} dispatch - dispatch the specified action.
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  signup: (user, route) => (authActions.authenticate(user, route)),
  clearMessages: () => (commonActions.clearMessages()),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
