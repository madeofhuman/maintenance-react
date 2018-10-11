import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import RequestForm from '../components/RequestForm';
import requestActions from '../actions/requestActions';
import Loader from '../components/LoaderComponent';

/**
 * Manages the state and actions of the Update Request Component
 * @class
 * @extends React.Component
 */
export class UpdateRequest extends Component {
  constructor(props) {
    super(props);
    const { initialValues } = this.props;
    this.state = {
      id: initialValues.id,
      type: initialValues.type,
      item: initialValues.item,
      model: initialValues.model,
      detail: initialValues.detail,
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
   * Validates the user input and calls the updateRequest action dispatcher
   * to update the request if the input is valid, or toast an error otherwise.
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const {
      updateRequest, getRequest, error, history,
    } = this.props;
    const {
      id, type, item, model, detail,
    } = this.state;
    const requestData = {
      type, item, model, detail,
    };
    if (requestData.type.trim() === '') return toastr.error('Type cannot be empty.');
    if (requestData.item.trim() === '') return toastr.error('Item cannot be empty.');
    if (requestData.detail.trim() === '') return toastr.error('Description cannot be empty.');
    if (requestData.model.trim() === '') requestData.model = 'N/A';
    updateRequest(requestData, id);
    if (!error) {
      this.setState({
        type: '',
        item: '',
        model: '',
        detail: '',
      });
      getRequest(id);
      history.push(`/view/${id}`);
    }
  }

  /**
   * Renders the Update Request Form component on a node in the DOM
   */
  render() {
    const { handleClose, loading } = this.props;
    const {
      id, type, item, model, detail,
    } = this.state;
    if (loading) {
      return (<Loader />);
    }
    return (
      <RequestForm
        id={id}
        type={type}
        item={item}
        model={model}
        detail={detail}
        handleSubmit={this.handleSubmit}
        handleClose={handleClose}
        handleChange={this.handleChange}
      />
    );
  }
}

UpdateRequest.defaultProps = {
  error: undefined,
};

UpdateRequest.propTypes = {
  error: PropTypes.string,
  history: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  updateRequest: PropTypes.func.isRequired,
  getRequest: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.shape({}).isRequired,
};

/**
 * Add specified items in the global store as props to the component
 * @param {object} state the global store
 * @param {object} ownProps the component specific props
 */
export const mapStateToProps = state => ({
  error: state.common.error,
  loading: state.common.loading,
});

/**
 * Add specified action creators as props to the component
 * @param {function} dispatch - dispatch the specified action.
 */
export const mapDispatchToProps = dispatch => bindActionCreators({
  updateRequest: (requestData, requestId) => (requestActions.updateRequest(requestData, requestId)),
  getRequest: requestId => (requestActions.getSingleRequest(requestId)),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRequest);
