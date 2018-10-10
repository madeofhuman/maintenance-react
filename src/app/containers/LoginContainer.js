import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import Input from '../components/InputComponent';
import authActions from '../actions/authActions';
import commonActions from '../actions/commonActions';
import Loader from '../components/LoaderComponent';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidUpdate() {
    const {
      user, history, error, message, clearMessages,
    } = this.props;
    if (user === undefined && error === undefined && message === undefined) {
      return true;
    }
    if (user === undefined && error !== undefined && message !== undefined) {
      toastr.error(message);
      clearMessages();
    }
    if (user !== undefined && error === undefined && message !== undefined) {
      if (user.role !== 'user') {
        history.push('/admin');
        toastr.success(message);
        clearMessages();
      } else {
        history.push('/dashboard');
        toastr.success(message);
        clearMessages();
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      email, password,
    } = this.state;
    const { login } = this.props;
    const user = {
      email, password,
    };
    return login(user, 'login');
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

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

const mapStateToProps = (state, ownProps) => ({
  loading: state.common.loading,
  history: ownProps.history,
  user: state.auth.user,
  message: state.common.message,
  error: state.common.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login: (user, route) => (authActions.authenticate(user, route)),
  clearMessages: () => (commonActions.clearMessages()),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
