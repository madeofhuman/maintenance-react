import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/common/NavbarComponent';
import '../assets/css/home.css';
import wrenchHammer from '../assets/img/wrench-hammer.svg';
import backgroundImage from '../assets/img/gears.svg';
import Modal from '../components/common/Modal';
import LoginForm from './LoginContainer';
import SignupForm from './SignupContainer';

class Homepage extends Component {
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

  render() {
    const { show, modalContent } = this.state;
    const { history } = this.props;
    return (
      <main>
        <Modal show={show} handleClose={this.hideModal}>
          { modalContent === 'sign-in' ? <LoginForm handleClose={this.hideModal} history={history} /> : <SignupForm handleClose={this.hideModal} /> }
        </Modal>
        <div className="wrapper">
          <div className="header">
            <Navbar profileIconVisibility="hidden" />
          </div>
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
      </main>
    );
  }
}

Homepage.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Homepage;
