import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from './InputComponent';

const displayButtons = (requestStatus, userRole, requestId) => {
  if (userRole === 'admin') {
    switch (requestStatus) {
      case 'in-review':
        return (
          <React.Fragment>
            <br /><br />
            <Input
              type="button"
              onclick="approveRequest()"
              className="button left green-bg white"
              id="approve-btn"
              value="Approve"
            />
            <br />
            <Input
              type="button"
              onclick="disapproveRequest()"
              className="button left green-bg white"
              id="disapprove-btn"
              value="Disapprove"
            />
            <br /><br />
          </React.Fragment>
        );
      case 'pending':
        return (
          <React.Fragment>
            <Input
              type="button"
              onclick="resolveRequest()"
              className="button left green-bg white"
              id="resolve-btn"
              value="Resolve"
            />
          </React.Fragment>
        );
      case 'disapproved':
      case 'resolved':
        return (
          <React.Fragment>
            <Input
              type="button"
              className="button left green-bg white"
              id="resolve-btn"
              value="Request Completed"
            />
          </React.Fragment>
        );
      default:
        break;
    }
  }
  if (userRole === 'user') {
    switch (requestStatus) {
      case 'in-review':
        return (
          <React.Fragment>
            <br /><br />
            <Link to={`/request/${requestId}/edit`}>
              <Input
                type="button"
                className="button left green-bg white"
                id="edit-btn"
                value="      Edit      "
              />
            </Link>
            <br />
            <Input
              type="button"
              onclick="deleteRequest()"
              className="button left green-bg white"
              id="delete-btn"
              value="   Delete   "
            />
            <br /><br />
          </React.Fragment>
        );
      default:
        break;
    }
  }
};

const RequestCard = ({ request, role }) => (
  <div className="card white">
    <div className="row">
      <h2 id="title" className="left orange">{request.item}, {request.type}</h2>
      <p id="date" className="right">{new Date(request.created_at).toDateString()}</p>
    </div>
    <small className="left white small" id="model">{request.model} -</small>
    <em id="status">&nbsp;{request.status}</em>
    <br />
    <div className="row">
      <div className="left" id="owner">{`by ${request.owner}`}</div>
    </div>
    <br />
    <div className="row">
      <em id="detail">{request.detail}</em>
    </div>
    <br />
    <br />
    <br />
    <div className="row center" id="request-btns">
      {displayButtons(request.status, role, request.id)}
    </div>
  </div>
);


RequestCard.propTypes = {
  request: PropTypes.shape({}).isRequired,
  role: PropTypes.string.isRequired,
};

export default RequestCard;
