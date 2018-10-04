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
import '../assets/css/dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const {
      authenticated, getRequests, history, user,
    } = this.props;
    if (!authenticated && user === undefined) {
      history.push('/');
    }
    if (user.role !== 'admin') {
      history.push('/dashboard');
    }
    if (user.role === 'admin') {
      history.push('/admin');
    }
    getRequests();
  }

  render() {
    const {
      loading, requests, user, message,
    } = this.props;
    return (
      <React.Fragment>
        <Navbar profileIconVisibility="" />
        <div className="body" style={{ backgroundImage: `url(${spannerScrewdriver})` }}>
          <div className="wrapper">
            <div className="left white">
              <span id="username">Welcome, {user.firstName}</span>
            </div>
            <div id="table-sort" className="right white">
              <span id="sort-group">
                <span>Sort by: </span>
                <span>
                  <select className="dropdown" id="request-status-dropdown">
                    <option value="all">All</option>
                    <option value="pending">In-Review</option>
                    <option value="approved">Pending</option>
                    <option value="ongoing">Disapproved</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </span>
                &nbsp;
              </span>
              { user.role !== 'admin' ? (
                <span>
                  <a href="/new">
                    <Input id="new-request-btn" className="button" type="button" value="New Request" />
                  </a>
                </span>)
                : false }
            </div>
            <br />
            <br />
            {requests ? <RequestTable requests={requests} message={message} /> : false}
            <span className="table-nav right hidden">
              <Input type="button" value="<" className="button" />
              <Input type="button" value=">" className="button" />
            </span>
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
