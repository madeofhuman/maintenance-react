import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from './InputComponent';

const RequestTable = ({ requests, message }) => (
  <React.Fragment>
    <div className="table-wrapper" id="table-wrapper">
      { requests.length > 0 ? (
        <table className="table white" id="requests-table">
          <thead className="orange">
            <tr>
              <th>S/N</th>
              <th>Item Name</th>
              <th>Model</th>
              <th>Request Type</th>
              <th>Description</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            { requests.map((request, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{request.item}</td>
                <td>{request.model}</td>
                <td>{request.type}</td>
                <td>{request.detail}</td>
                <td>{request.status}</td>
                <td>
                  <Link to={`view?id=${request.id}`}>
                    <Input type="button" value="View" className="button" />
                  </Link>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>)
        : (
          <div className="wrapper white">
            <p>{message}</p>
          </div>)
        }
    </div>
  </React.Fragment>
);

RequestTable.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  message: PropTypes.string.isRequired,
};

export default RequestTable;
