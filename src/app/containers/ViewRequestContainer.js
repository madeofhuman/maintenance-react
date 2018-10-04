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

class ViewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { match, getRequest } = this.props;
    const { requestId } = match.params;
    getRequest(requestId);
  }

  render() {
    const { request, loading, user } = this.props;
    return (
      <React.Fragment>
        <Navbar />
        <div className="body" style={{ backgroundImage: `url(${cloudGearSpanner})` }}>
          <p className="output white center" id="output" />
          <div className="wrapper" id="wrapper">
            { typeof request !== 'array' ? <RequestCard request={request} role={user.role} /> : <p className="white">Request does not exist</p> }
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
};

const matchStateToProps = (state, ownProps) => ({
  loading: state.common.loading,
  request: state.requests.request,
  match: ownProps.match,
  user: state.auth.user,
});

const matchDispatchToProps = dispatch => bindActionCreators({
  getRequest: requestData => (getAllRequests.getSingleRequest(requestData)),
}, dispatch);

export default connect(matchStateToProps, matchDispatchToProps)(ViewRequest);
