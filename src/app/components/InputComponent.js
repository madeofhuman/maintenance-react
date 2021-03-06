import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the Input component on a node in the DOM
 * @returns {object} the Input component to render
 */
const Input = ({
  type, name, handleChange, label, id, isRequired, className, handleClick, value,
}) => (
  <React.Fragment>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      id={id}
      className={className}
      value={value}
      onChange={handleChange}
      required={isRequired}
      onClick={handleClick}
    />
  </React.Fragment>
);

Input.defaultProps = {
  isRequired: '',
  className: '',
  id: '',
  label: undefined,
  handleChange: undefined,
  name: undefined,
  handleClick: undefined,
  value: undefined,
  type: undefined,
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.node,
  handleChange: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string,
  isRequired: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Input;
