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

export class ViewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount = async () => {
    const { match, getRequest } = this.props;
    const { requestId } = match.params;
    await getRequest(requestId);
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

  deleteRequest = () => {
    const { match, deleteRequest, history } = this.props;
    const { requestId } = match.params;
    deleteRequest(requestId);
    history.push('/');
  }

  approveRequest = () => {
    const { match, approveRequest } = this.props;
    const { requestId } = match.params;
    approveRequest(requestId);
  }

  disapproveRequest = () => {
    const { match, disapproveRequest } = this.props;
    const { requestId } = match.params;
    disapproveRequest(requestId);
  }

  resolveRequest = () => {
    const { match, resolveRequest } = this.props;
    const { requestId } = match.params;
    resolveRequest(requestId);
  }

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
