import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Creates a PrivateRoute mapper to restrict access to specified components
 * and perform authorisation checks on the user before allowing access.
 * @param {object} component - the component to protect and render
 * @param {boolean} authenticated - a value gotten from the store to denote
 * whether the user is logged in
 * @returns {object} the specified component to render
 */
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authenticated
        ? (
          <Component {...props} />
        )
        : (
          <Redirect to="/" />
        )
    )}
  />
);

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, null)(PrivateRoute);
