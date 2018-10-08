import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from '../components/NavbarComponent';
import getAllRequests from '../actions/requestActions';
import Loader from '../components/LoaderComponent';
import RequestTable from '../components/RequestTableComponent';
import spannerScrewdriver from '../assets/img/spanner-screwdriver.svg';
import Input from '../components/InputComponent';
import Modal from '../components/ModalComponent';
import '../assets/css/dashboard.css';
import RequestForm from '../components/RequestForm';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount = () => {
    const { getRequests, history, user } = this.props;
    if (user.role !== 'admin') {
      history.push('/dashboard');
    }
    if (user.role === 'admin') {
      history.push('/admin');
    }
    getRequests();
  }

  showModal = () => {
    this.setState({
      show: true,
    });
  };

  hideModal = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const { show } = this.state;
    const {
      loading, requests, user, message,
    } = this.props;
    return (
      <React.Fragment>
        <Modal show={show} handleClose={this.hideModal}>
          <RequestForm handleClose={this.hideModal} />
        </Modal>
        <Navbar profileIconVisibility="" />
        <div className="body" style={{ backgroundImage: `url(${spannerScrewdriver})` }}>
          <div className="wrapper">
            <div className="left white">
              <span id="username">Welcome, {user.firstName}</span>
            </div>
            <div className="right white">
              { user.role !== 'admin' ? (
                <span>
                  <Input
                    id="new-request-btn"
                    className="button"
                    type="button"
                    name="new-request"
                    value="New Request"
                    handleClick={this.showModal}
                  />
                </span>)
                : false }
            </div>
            <br />
            <br />
            {requests ? <RequestTable requests={requests} message={message} /> : false}
          </div>
          <br />
          <div className="divider" />
        </div>
        {loading ? <Loader /> : false}
      </React.Fragment>
    );
  }
}

Dashboard.defaultProps = {
  user: undefined,
};

Dashboard.propTypes = {
  history: PropTypes.shape({}).isRequired,
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  message: PropTypes.string.isRequired,
  user: PropTypes.shape({}),
  getRequests: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  authenticated: state.auth.authenticated,
  loading: state.common.loading,
  history: ownProps.history,
  requests: state.requests.requests,
  message: state.requests.message,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getRequests: () => (getAllRequests.getAllRequests()),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
