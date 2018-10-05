import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from './InputComponent';
import '../assets/css/new.css';
import requestActions from '../actions/requestActions';

class RequestForm extends Component {
  constructor(props) {
    super(props);
    const { initialValues } = this.props;
    this.state = {
      type: initialValues !== undefined ? initialValues.type : '',
      item: initialValues !== undefined ? initialValues.item : '',
      model: initialValues !== undefined ? initialValues.model : '',
      detail: initialValues !== undefined ? initialValues.detail : '',
      id: initialValues !== undefined ? initialValues.id : undefined,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      type, item, model, detail, id,
    } = this.state;
    const requestData = {
      type, item, detail, model,
    };
    const { createRequest, updateRequest, getAllRequests } = this.props;
    if (id === undefined) {
      createRequest(requestData);
    } else {
      updateRequest(requestData, id);
    }
    getAllRequests();
  }

  render() {
    const { handleClose, initialValues } = this.props;
    const {
      type, item, model, detail, id, isNew,
    } = this.state;
    return (
      <React.Fragment>
        <form className="form request-form" id="new-request-form" onSubmit={this.handleSubmit}>
          <span id="sign-up-form-close-btn" className="close-btn grey right" onClick={handleClose}>x</span>
          <Input
            type="hidden"
            name="id"
            value={id}
          />
          <label id="title" className="left orange center">{ isNew ? 'Create a new request' : 'Update request' }</label>
          <select name="type" id="type" required="required" className="transparent-selector" value={type} onChange={this.handleChange}>
            <option value="" disabled>Select request type</option>
            <option value="maintenance">Maintenance</option>
            <option value="repair">Repair</option>
          </select>
          <br />
          <Input
            type="text"
            name="item"
            id="item"
            value={item}
            isRequired="required"
            label="Item:"
            handleChange={this.handleChange}
          />
          <br />
          <Input
            type="text"
            id="model"
            name="model"
            value={model}
            isRequired="required"
            label="Model:"
            handleChange={this.handleChange}
          />
          <br />
          <label>
            <span>Description:</span>
          </label>
          <textarea
            type="text"
            name="detail"
            cols="40"
            id="detail"
            required="required"
            value={detail}
            onChange={this.handleChange}
          />
          <Input type="submit" id="new-request-btn" value="Submit" className="white auth-submit-btn" />
        </form>
      </React.Fragment>
    );
  }
}

RequestForm.defaultProps = {
  history: undefined,
  initialValues: undefined,
};

RequestForm.propTypes = {
  request: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}),
  createRequest: PropTypes.func.isRequired,
  updateRequest: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}),
  getAllRequests: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  request: state.requests.request,
  history: ownProps.history,
  match: ownProps.match,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllRequests: () => (requestActions.getAllRequests()),
  createRequest: requestData => (requestActions.createRequest(requestData)),
  updateRequest: (requestData, requestId) => (requestActions.updateRequest(requestData, requestId)),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
