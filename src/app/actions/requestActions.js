import toastr from 'toastr';
import types from './commonTypes';

const getAllRequests = () => async (dispatch, getState) => {
  const state = getState();
  const { token, user } = state.auth;
  let baseUrl = '';
  if (user.role === 'user') {
    baseUrl = 'https://maintain-r.herokuapp.com/api/v1/users/requests';
  } else {
    baseUrl = 'https://maintain-r.herokuapp.com/api/v1/requests';
  }
  dispatch({ type: types.LOADING });
  try {
    const response = await fetch(`${baseUrl}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'reload',
    });
    const data = await response.json();
    switch (data.statusCode) {
      case 200:
        dispatch({
          type: types.GET_ALL_REQUESTS,
          payload: {
            requests: data.result,
            message: data.message,
          },
        });
        dispatch({ type: types.COMPLETE });
        break;
      default:
        dispatch({ type: types.PROCESS_ERROR });
        dispatch({ type: types.COMPLETE });
        toastr.error(data.message);
    }
  } catch (error) {
    dispatch({ type: types.NETWORK_ERROR });
    dispatch({ type: types.COMPLETE });
    toastr.error(error);
  }
};

const getSingleRequest = requestData => async (dispatch, getState) => {
  const state = getState();
  const { token, user } = state.auth;
  let baseUrl = '';
  if (user.role === 'user') {
    baseUrl = `https://maintain-r.herokuapp.com/api/v1/users/requests/${requestData}`;
  } else {
    baseUrl = `https://maintain-r.herokuapp.com/api/v1/requests/${requestData}`;
  }
  dispatch({ type: types.LOADING });
  try {
    const response = await fetch(`${baseUrl}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'reload',
    });
    const data = await response.json();
    switch (data.statusCode) {
      case 200:
        dispatch({
          type: types.GET_SINGLE_REQUEST,
          payload: {
            request: data.result,
            message: data.message,
          },
        });
        dispatch({ type: types.COMPLETE });
        break;
      default:
        dispatch({ type: types.PROCESS_ERROR });
        dispatch({ type: types.COMPLETE });
        toastr.error(data.message);
    }
  } catch (error) {
    dispatch({ type: types.NETWORK_ERROR });
    dispatch({ type: types.COMPLETE });
    toastr.error(error);
  }
};

export default {
  getAllRequests,
  getSingleRequest,
};
