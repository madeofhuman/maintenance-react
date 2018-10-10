import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import RequestForm from '../components/RequestForm';
import requestActions from '../actions/requestActions';


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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

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

export const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
});

export const mapDispatchToProps = dispatch => bindActionCreators({
  createRequest: requestData => (requestActions.createRequest(requestData)),
  getAllRequests: () => (requestActions.getAllRequests()),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewRequest);
