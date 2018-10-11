import types from './commonTypes';

const baseUrl = 'https://maintain-r.herokuapp.com/api/v1/';

/**
 * An action creator that dispatches the SIGNUP or LOGIN action
 * depending on the status of the API response gotten after the
 * API call has been made.
 * @param {object} userData - the user data from the form to POST
 * or PUT to the API
 * @param {string} path - the url endpoint for the request. Is either
 * 'signup' or 'login'
 */
const authenticate = (userData, path) => async (dispatch) => {
  dispatch({ type: types.LOADING });
  try {
    const response = await fetch(`${baseUrl}auth/${path}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    switch (data.statusCode) {
      case 201:
        dispatch({ type: types.SIGNUP, payload: data });
        dispatch({ type: types.COMPLETE });
        break;
      case 200:
        dispatch({ type: types.LOGIN, payload: data });
        dispatch({ type: types.COMPLETE });
        break;
      case 400:
      case 409:
      case 500:
      default:
        dispatch({ type: types.PROCESS_ERROR, payload: data });
        dispatch({ type: types.COMPLETE });
        break;
    }
  } catch (error) {
    dispatch({ type: types.NETWORK_ERROR });
    dispatch({ type: types.COMPLETE });
  }
};

/**
 * An action creator that dispatches the LOGOUT action
 */
const logout = () => ({ type: types.LOGOUT });

export default {
  authenticate,
  logout,
};
