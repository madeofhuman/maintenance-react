import React from 'react';
import PropTypes from 'prop-types';
import Input from './InputComponent';

const displayButtons = (requestStatus, userRole, requestActions, showModal) => {
  if (userRole === 'admin') {
    switch (requestStatus) {
      case 'in-review':
        return (
          <React.Fragment>
            <br /><br />
            <Input
              type="button"
              handleClick={requestActions.approveRequest}
              className="button left green-bg white"
              id="approve-btn"
              value="Approve"
            />
            <br />
            <Input
              type="button"
              handleClick={requestActions.disapproveRequest}
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
              handleClick={requestActions.resolveRequest}
              className="button left green-bg white"
              id="resolve-btn"
              value="Resolve"
            />
          </React.Fragment>
        );
      case 'disapproved':
        return (
          <React.Fragment>
            <Input
              type="button"
              className="button left green-bg white"
              id="resolve-btn"
              value="Request Disapproved"
            />
          </React.Fragment>
        );
      default:
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
    }
  } else {
    switch (requestStatus) {
      case 'in-review':
        return (
          <React.Fragment>
            <br /><br />
            <Input
              type="button"
              className="button left green-bg white"
              name="edit-request"
              handleClick={showModal}
              id="edit-btn"
              value="       Edit       "
            />
            <br />
            <Input
              type="button"
              handleClick={requestActions.deleteRequest}
              className="button left green-bg white"
              id="delete-btn"
              value="    Delete    "
            />
            <br /><br />
          </React.Fragment>
        );
      default:
        break;
    }
  }
};

const RequestCard = ({
  request, role, requestActions, showModal,
}) => (
  <div className="card white">
    {
      typeof request === 'object' ? (
        <React.Fragment>
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
            {displayButtons(request.status, role, requestActions, showModal)}
          </div>
        </React.Fragment>
      )
        : (<div id="no-request-message">The request you are looking for does not exist</div>)
      }
  </div>
);

RequestCard.defaultProps = {
  showModal: undefined,
};

RequestCard.propTypes = {
  request: PropTypes.shape({}).isRequired,
  role: PropTypes.string.isRequired,
  requestActions: PropTypes.shape({}).isRequired,
  showModal: PropTypes.func,
};

export default RequestCard;
