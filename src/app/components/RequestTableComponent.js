import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TablePagination } from 'react-pagination-table';

const RequestTable = ({ requests, message }) => {
  const parsedRequests = requests.map((request, i) => ({
    ...request,
    index: i + 1,
    link: (<Link to={`view/${request.id}`}><input type="button" value="View" className="button" /></Link>),
  }));
  return (
    <React.Fragment>
      <div className="table-wrapper" id="table-wrapper">
        { requests.length > 0 ? (
          <TablePagination
            headers={['ID', 'Item Name', 'Model', 'Request Type', 'Description', 'Status', '']}
            data={parsedRequests}
            columns="index.item.model.type.detail.status.link"
            perPageItemCount={20}
            totalCount={requests.length}
            className__table="table white"
            className__header="orange"
          />)
          : (
            <div className="wrapper white">
              <p>You have no requests at the moment</p>
            </div>)
          }
      </div>
    </React.Fragment>
  );
};

RequestTable.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  message: PropTypes.string.isRequired,
};

export default RequestTable;
