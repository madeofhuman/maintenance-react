import toastr from 'toastr';
import types from './commonTypes';

const baseUrl = 'https://maintain-r.herokuapp.com/api/v1/';

const authenticate = (userData, history, path) => async (dispatch) => {
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
        toastr.success(data.message);
        break;
      case 200:
        dispatch({ type: types.LOGIN, payload: data });
        dispatch({ type: types.COMPLETE });
        if (data.user.role === 'user') {
          history.push('/dashboard');
        } else {
          history.push('/admin');
        }
        toastr.success(data.message);
        break;
      default:
        dispatch({ type: types.PROCESS_ERROR, payload: data.message });
        dispatch({ type: types.COMPLETE });
        toastr.error(data.message);
        break;
    }
  } catch (error) {
    dispatch({ type: types.NETWORK_ERROR });
    dispatch({ type: types.COMPLETE });
    return toastr.error(error);
  }
};

export default {
  authenticate,
  logout: () => ({ type: types.LOGOUT }),
};
