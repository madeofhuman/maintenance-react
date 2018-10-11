import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import RequestForm from '../components/RequestForm';
import requestActions from '../actions/requestActions';

/**
 * Manages the state and actions of the New Request Component
 * @class
 * @extends React.Component
 */
export class NewRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      item: '',
      model: '',
      detail: '',
    };
  }

  /**
   * Updates the value of the item in the form state with the value of their bound
   * DOM elements when the DOM elements change
   */
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * Validates the user input and calls the createRequest action dispatcher
   * to create the request if the input is valid, or toast an error otherwise.
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const {
      createRequest, getAllRequests,
    } = this.props;
    const {
      type, item, model, detail,
    } = this.state;
    const requestData = {
      type, item, model, detail,
    };
    if (requestData.type.trim() === '') return toastr.error('Type cannot be empty.');
    if (requestData.item.trim() === '') return toastr.error('Item cannot be empty.');
    if (requestData.detail.trim() === '') return toastr.error('Description cannot be empty.');
    if (requestData.model.trim() === '') requestData.model = 'N/A';
    createRequest(requestData);
    getAllRequests();
  }

  /**
   * Renders the New Request Form component on a node in the DOM
   */
  render() {
    const { handleClose } = this.props;
    return (
      <RequestForm
        handleSubmit={this.handleSubmit}
        handleClose={handleClose}
        handleChange={this.handleChange}
      />
    );
  }
}

NewRequest.defaultProps = {
  history: undefined,
};

NewRequest.propTypes = {
  history: PropTypes.shape({}),
  createRequest: PropTypes.func.isRequired,
  getAllRequests: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

/**
 * Add specified items in the global store as props to the component
 * @param {object} state the global store
 * @param {object} ownProps the component specific props
 */
export const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
});

/**
 * Add specified action creators as props to the component
 * @param {function} dispatch - dispatch the specified action.
 */
export const mapDispatchToProps = dispatch => bindActionCreators({
  createRequest: requestData => (requestActions.createRequest(requestData)),
  getAllRequests: () => (requestActions.getAllRequests()),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewRequest);
