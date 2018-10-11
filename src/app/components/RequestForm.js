import React from 'react';
import PropTypes from 'prop-types';
import Input from './InputComponent';
import '../assets/css/new.css';

/**
 * Renders the RequestForm component on a node in the DOM
 * @param {number} id - the id property of the request to display.
 * Only applies if the form is called as an update form
 * @param {string} type - the type property of the request to display.
 * Only applies if the form is called as an update form
 * @param {string} item - the item property of the request to display.
 * Only applies if the form is called as an update form
 * @param {string} model - the model property of the request to display.
 * Only applies if the form is called as an update form
 * @param {string} detail - the detail property of the request to display.
 * Only applies if the form is called as an update form
 * @param {function} handleSubmit - this is to be called when a submit event
 * happens to the form
 * @param {function} handleChange - this is to be called when a change event
 * happens to an editable element of the form
 * @returns {object} the RequestForm component to render
 */
export const RequestForm = ({
  id, type, item, model, detail, handleSubmit, handleClose, handleChange,
}) => (
  <React.Fragment>
    <form className="form request-form" id="new-request-form" onSubmit={handleSubmit}>
      <span id="sign-up-form-close-btn" className="close-btn grey right" onClick={handleClose}>x</span>
      <Input
        type="hidden"
        name="id"
        value={id}
        handleChange={handleChange}
      />
      <label id="title" className="left orange center">
        { id === undefined ? 'Create a new request' : 'Update request' }
      </label>
      <select
        name="type"
        id="type"
        required="required"
        className="transparent-selector"
        value={type}
        onChange={handleChange}
      >
        <option value="" selected disabled>Select request type</option>
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
        handleChange={handleChange}
      />
      <br />
      <Input
        type="text"
        id="model"
        name="model"
        value={model}
        label="Model:"
        handleChange={handleChange}
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
        onChange={handleChange}
      />
      <Input type="submit" id="new-request-btn" value="Submit" className="white auth-submit-btn" />
    </form>
  </React.Fragment>
);

RequestForm.defaultProps = {
  initialValues: undefined,
  id: undefined,
  type: undefined,
  item: undefined,
  model: undefined,
  detail: undefined,
  handleSubmit: undefined,
};

RequestForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
  id: PropTypes.number,
  type: PropTypes.string,
  item: PropTypes.string,
  model: PropTypes.string,
  detail: PropTypes.string,
};

export default RequestForm;
