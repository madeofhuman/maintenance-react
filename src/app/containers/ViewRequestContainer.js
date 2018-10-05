import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from '../components/NavbarComponent';
import getAllRequests from '../actions/requestActions';
import '../assets/css/request.css';
import cloudGearSpanner from '../assets/img/cloud-gear-spanner.svg';
import RequestCard from '../components/RequestCardComponent';
import Loader from '../components/LoaderComponent';
import Modal from '../components/ModalComponent';
import RequestForm from '../components/RequestForm';

class ViewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount = () => {
    const { match, getRequest } = this.props;
    const { requestId } = match.params;
    getRequest(requestId);
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
    const { match, deleteRequest } = this.props;
    const { requestId } = match.params;
    deleteRequest(requestId);
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
      request, loading, user,
    } = this.props;
    const { show } = this.state;
    return (
      <React.Fragment>
        <Modal show={show} handleClose={this.hideModal}>
          <RequestForm handleClose={this.hideModal} initialValues={request} />
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
        { loading ? <Loader /> : false }
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
};

const matchStateToProps = (state, ownProps) => ({
  loading: state.common.loading,
  request: state.requests.request,
  match: ownProps.match,
  user: state.auth.user,
});

const matchDispatchToProps = dispatch => bindActionCreators({
  getRequest: requestData => (getAllRequests.getSingleRequest(requestData)),
  deleteRequest: requestId => (getAllRequests.deleteRequest(requestId)),
  approveRequest: requestId => (getAllRequests.approveRequest(requestId)),
  disapproveRequest: requestId => (getAllRequests.disapproveRequest(requestId)),
  resolveRequest: requestId => (getAllRequests.resolveRequest(requestId)),
}, dispatch);

export default connect(matchStateToProps, matchDispatchToProps)(ViewRequest);
