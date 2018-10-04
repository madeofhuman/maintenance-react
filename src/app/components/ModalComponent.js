import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ show, children }) => {
  const showHideClassname = show === true ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassname}>
      <section className="modal-main">
        {children}
      </section>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.shape().isRequired,
};

export default Modal;
