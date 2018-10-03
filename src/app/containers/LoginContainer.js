import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from '../components/common/Input';
import authenticate from '../actions/authActions';
import Loader from '../components/common/Loader';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
      email, password,
    } = this.state;
    const { login, history } = this.props;
    const user = {
      email, password,
    };
    return login(user, history, 'login');
  };

  render() {
    const {
      email, password,
    } = this.state;
    const { handleClose, loading } = this.props;
    return (
      <React.Fragment>
        <div id="sign-in-form" className="form">
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

LoginForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.common.loading,
  history: ownProps.history,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login: (user, history, route) => (authenticate.authenticate(user, history, route)),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
