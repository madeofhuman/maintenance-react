import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import Navbar from '../components/NavbarComponent';
import requestActions from '../actions/requestActions';
import Loader from '../components/LoaderComponent';
import RequestTable from '../components/RequestTableComponent';
import spannerScrewdriver from '../assets/img/spanner-screwdriver.svg';
import Input from '../components/InputComponent';
import '../assets/css/dashboard.css';
import NewRequest from './NewRequestContainer';

/**
 * Manages the state and actions of the Dashboard Component
 * @class
 * @extends React.Component
 */
export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  /**
   * routes the user and admin to their dashboard url path
   * and calls the getRequest action dispatcher to fetch the
   * appropriate requests.
   */
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

  /**
   * Toggles the modal state to open
   */
  showModal = () => {
    this.setState({
      show: true,
    });
  };

  /**
   * Toggles the modal state to closed
   */
  hideModal = () => {
    this.setState({
      show: false,
    });
  };

  /**
   * Renders the Dashboard component on a node in the DOM
   */
  render() {
    const { show } = this.state;
    const {
      loading, requests, user, message,
    } = this.props;
    return (
      <React.Fragment>
        <Modal
          isOpen={show}
          handleClose={this.hideModal}
          ariaHideApp={false}
          overlayClassName="modal-overlay"
          className="modal-content"
        >
          <NewRequest
            handleClose={this.hideModal}
            handleSubmit={this.handleSubmit}
          />
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
            {requests ? (
              <RequestTable
                requests={requests}
                message={message}
              />)
              : (
                <div
                  className="wrapper white"
                >
                  <p>You have no requests at the moment.
                    Do you have anything that needs fixing?
                    We love to fix stuff.
                  </p>
                </div>
              )
            }
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

/**
 * Add specified items in the global store as props to the component
 * @param {object} state the global store
 * @param {object} ownProps the component specific props
 */
export const mapStateToProps = (state, ownProps) => ({
  authenticated: state.auth.authenticated,
  loading: state.common.loading,
  history: ownProps.history,
  requests: state.requests.requests,
  message: state.requests.message,
  user: state.auth.user,
});

/**
 * Add specified action creators as props to the component
 * @param {function} dispatch - dispatch the specified action.
 */
export const mapDispatchToProps = dispatch => bindActionCreators({
  getRequests: () => (requestActions.getAllRequests()),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
