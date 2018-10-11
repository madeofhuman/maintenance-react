import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from '../components/InputComponent';
import authActions from '../actions/authActions';
import commonActions from '../actions/commonActions';
import Loader from '../components/LoaderComponent';
import utils from '../assets/js/utils';

/**
 * Manages the state and actions of the Login Form Component
 * @class
 * @extends React.Component
 */
export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  /**
   * Calls the login action creator to log the user in,
   * and redirects to their dashboard on successful login
   * or toasts an error otherwise
   */
  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      email, password,
    } = this.state;
    const { login } = this.props;
    const userDetail = {
      email, password,
    };
    await login(userDetail, 'login');
    const {
      user, history, error, message, clearMessages,
    } = this.props;
    utils.handleLogin(user, history, error, message, clearMessages);
  };

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
   * Renders the Login Form component on a node in the DOM
   */
  render() {
    const {
      email, password,
    } = this.state;
    const { handleClose, loading } = this.props;
    return (
      <React.Fragment>
        <div id="sign-in-form" className="auth-form">
          <form id="login-form" onSubmit={this.handleSubmit}>
            <span id="sign-up-form-close-btn" className="close-btn grey right" onClick={handleClose}>x</span>
            <p className="output white" />
            <Input
              type="text"
              name="email"
              id="login-email"
              label="Email"
              value={email}
              handleChange={this.handleChange}
              isRequired="required"
            />
            <br /><br />
            <Input
              type="password"
              name="password"
              id="login-password"
              label="Password"
              value={password}
              handleChange={this.handleChange}
              isRequired="required"
            />
            <br /><br />
            <Input
              type="submit"
              value="Log in"
              className="white auth-submit-btn"
              id="signin-btn"
            />
          </form>
        </div>
        { loading ? <Loader /> : '' }
      </React.Fragment>
    );
  }
}

LoginForm.defaultProps = {
  user: undefined,
  error: undefined,
  message: undefined,
};

LoginForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
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
  login: (user, route) => (authActions.authenticate(user, route)),
  clearMessages: () => (commonActions.clearMessages()),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
