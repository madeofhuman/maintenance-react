import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../components/NavbarComponent';
import '../assets/css/home.css';
import wrenchHammer from '../assets/img/wrench-hammer.svg';
import backgroundImage from '../assets/img/gears.svg';
import Modal from '../components/ModalComponent';
import LoginForm from './LoginContainer';
import SignupForm from './SignupContainer';

export class Homepage extends Component {
  state = {
    show: false,
    modalContent: '',
  };

  showModal = (event) => {
    event.preventDefault();
    this.setState({
      show: true,
      modalContent: event.target.name,
    });
  };

  hideModal = () => {
    this.setState({
      show: false,
      modalContent: '',
    });
  };

  componentDidMount = () => {
    const { authenticated, history, role } = this.props;
    if (authenticated) {
      if (role === 'user') {
        history.push('/dashboard');
      }
      if (role === 'admin') {
        history.push('admin');
      }
      if (!role) {
        return true;
      }
    }
  }

  render() {
    const { show, modalContent } = this.state;
    const { history } = this.props;
    return (
      <React.Fragment>
        <Modal show={show} handleClose={this.hideModal}>
          { modalContent === 'sign-in' ? <LoginForm handleClose={this.hideModal} history={history} /> : <SignupForm handleClose={this.hideModal} /> }
        </Modal>
        <Navbar />
        <div className="">
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
                  We want to help you fix the things you love, and make sure the things that matter
                  most to you, do not fall to pieces, so you can actually enjoy using them.
                  <br /><br />
                  We take great pride in our work and our ability to exceed customer expectation.
                  You, the customer, are our greatest resource and we will treat you accordingly.
                </p>
              </span>
            </div>
            <div id="login-links" className="right">
              <span className="left link-btn">
                <a title="Sign in" name="sign-in" className="white" id="sign-in-link" onClick={this.showModal}>Sign in</a>
              </span>
              <span className="pipe white">
                |
              </span>
              <span className=" link-btn">
                <a title="Sign up" name="sign-up" className="orange" id="sign-up-link" onClick={this.showModal}>Sign up</a>
              </span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Homepage.defaultProps = {
  role: null,
};

Homepage.propTypes = {
  history: PropTypes.shape({}).isRequired,
  authenticated: PropTypes.bool.isRequired,
  role: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  authenticated: state.auth.authenticated,
  history: ownProps.history,
  role: state.auth.user !== null ? state.auth.user.role : null,
});

export default connect(mapStateToProps, null)(Homepage);
