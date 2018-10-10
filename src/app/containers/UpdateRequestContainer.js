import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import RequestForm from '../components/RequestForm';
import requestActions from '../actions/requestActions';
import Loader from '../components/LoaderComponent';


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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

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

export const mapStateToProps = state => ({
  error: state.common.error,
  loading: state.common.loading,
});

export const mapDispatchToProps = dispatch => bindActionCreators({
  updateRequest: (requestData, requestId) => (requestActions.updateRequest(requestData, requestId)),
  getRequest: requestId => (requestActions.getSingleRequest(requestId)),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRequest);
