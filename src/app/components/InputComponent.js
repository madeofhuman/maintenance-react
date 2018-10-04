import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type, name, value, handleChange, label, id, isRequired, className,
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
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.node.isRequired,
  handleChange: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string,
  isRequired: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
