import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import Navbar from '../components/NavbarComponent';
import getAllRequests from '../actions/requestActions';
import '../assets/css/request.css';
import cloudGearSpanner from '../assets/img/cloud-gear-spanner.svg';
import RequestCard from '../components/RequestCardComponent';
import Loader from '../components/LoaderComponent';
import UpdateRequest from './UpdateRequestContainer';

/**
 * Manages the state and actions of the View Request Component
 * @class
 * @extends React.Component
 */
export class ViewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  /**
   * Fetches the request when the component mounts
   */
  componentDidMount = async () => {
    const { match, getRequest } = this.props;
    const { requestId } = match.params;
    await getRequest(requestId);
  }

  /**
   * Mounts the modal with the edit request form
   */
  showModal = () => {
    this.setState({
      show: true,
    });
  };

  /**
   * Unmounts the modal with the edit request form
   */
  hideModal = () => {
    this.setState({
      show: false,
    });
  };

  /**
   * Delete the request the id of which is gotten from the url param
   * and redirect to the dashboard
   */
  deleteRequest = () => {
    const { match, deleteRequest, history } = this.props;
    const { requestId } = match.params;
    deleteRequest(requestId);
    history.push('/');
  }

  /**
   * Approve the request the id of which is gotten from the url param
   */
  approveRequest = () => {
    const { match, approveRequest } = this.props;
    const { requestId } = match.params;
    approveRequest(requestId);
  }

  /**
   * Disapprove the request the id of which is gotten from the url param
   */
  disapproveRequest = () => {
    const { match, disapproveRequest } = this.props;
    const { requestId } = match.params;
    disapproveRequest(requestId);
  }

  /**
   * Resolve the request the id of which is gotten from the url param
   */
  resolveRequest = () => {
    const { match, resolveRequest } = this.props;
    const { requestId } = match.params;
    resolveRequest(requestId);
  }

  /**
   * Renders the View Request component on a node in the DOM
   */
  render() {
    const {
      request, loading, user, history, match,
    } = this.props;
    const { show } = this.state;
    if (loading) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Modal
          isOpen={show}
          handleClose={this.hideModal}
          ariaHideApp={false}
          overlayClassName="modal-overlay"
          className="modal-content"
        >
          <UpdateRequest
            handleClose={this.hideModal}
            initialValues={request}
            history={history}
            match={match}
          />
        </Modal>
        <Navbar />
        <div className="body" style={{ backgroundImage: `url(${cloudGearSpanner})` }}>
          <p className="output white center" id="output" />
          <div className="wrapper" id="wrapper">
            { typeof request !== 'array' ? (
              <RequestCard
                request={request}
                role={user.role}
                requestActions={{
                  deleteRequest: this.deleteRequest,
                  approveRequest: this.approveRequest,
                  disapproveRequest: this.disapproveRequest,
                  resolveRequest: this.resolveRequest,
                }}
                showModal={this.showModal}
              />)
              : <p className="white">Request does not exist</p> }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ViewRequest.propTypes = {
  request: PropTypes.shape({}).isRequired,
  getRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  deleteRequest: PropTypes.func.isRequired,
  approveRequest: PropTypes.func.isRequired,
  disapproveRequest: PropTypes.func.isRequired,
  resolveRequest: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.common.loading,
  request: state.requests.request,
  match: ownProps.match,
  user: state.auth.user,
  history: ownProps.history,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getRequest: requestData => (getAllRequests.getSingleRequest(requestData)),
  deleteRequest: requestId => (getAllRequests.deleteRequest(requestId)),
  approveRequest: requestId => (getAllRequests.approveRequest(requestId)),
  disapproveRequest: requestId => (getAllRequests.disapproveRequest(requestId)),
  resolveRequest: requestId => (getAllRequests.resolveRequest(requestId)),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewRequest);
