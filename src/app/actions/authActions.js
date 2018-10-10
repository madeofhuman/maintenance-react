import types from './commonTypes';

const baseUrl = 'https://maintain-r.herokuapp.com/api/v1/';

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

export default {
  authenticate,
  logout: () => ({ type: types.LOGOUT }),
};
