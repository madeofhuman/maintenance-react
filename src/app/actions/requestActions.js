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
  } catch {
    dispatch({ type: types.NETWORK_ERROR });
    dispatch({ type: types.COMPLETE });
  }
};

const getSingleRequest = requestId => async (dispatch, getState) => {
  const state = getState();
  const { token, user } = state.auth;
  let baseUrl = '';
  if (user.role === 'user') {
    baseUrl = `https://maintain-r.herokuapp.com/api/v1/users/requests/${requestId}`;
  } else {
    baseUrl = `https://maintain-r.herokuapp.com/api/v1/requests/${requestId}`;
  }
  dispatch({ type: types.LOADING });
  try {
    const response = await fetch(`${baseUrl}`, {
      headers: { Authorization: `Bearer ${token}` },
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
  } catch {
    dispatch({ type: types.NETWORK_ERROR });
    dispatch({ type: types.COMPLETE });
    toastr.error('');
  }
};

const createRequest = requestData => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth;
  const baseUrl = 'https://maintain-r.herokuapp.com/api/v1/users/requests';
  dispatch({ type: types.LOADING });
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });
    const data = await response.json();
    switch (data.statusCode) {
      case 201:
        dispatch({ type: types.CREATE_REQUEST, payload: data });
        dispatch({ type: types.COMPLETE });
        toastr.success(data.message);
        break;
      case 400:
      default:
        dispatch({ type: types.PROCESS_ERROR, payload: { error: data.error, message: data.message } });
        dispatch({ type: types.COMPLETE });
        toastr.error(data.message);
        break;
    }
  } catch {
    dispatch({ type: types.NETWORK_ERROR });
    dispatch({ type: types.COMPLETE });
  }
};

const deleteRequest = requestId => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth;
  const baseUrl = `https://maintain-r.herokuapp.com/api/v1/users/requests/${requestId}`;
  dispatch({ type: types.LOADING });
  try {
    const response = await fetch(baseUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    switch (data.statusCode) {
      case 200:
        dispatch({ type: types.DELETE_REQUEST });
        dispatch({ type: types.COMPLETE });
        toastr.success(data.message);
        break;
      default:
        dispatch({ type: types.PROCESS_ERROR });
        dispatch({ type: types.COMPLETE });
        toastr.error(data.message);
        break;
    }
  } catch (error) {
    dispatch({ type: types.NETWORK_ERROR });
    dispatch({ type: types.COMPLETE });
    toastr.error('Network error');
  }
};

const updateRequest = (requestData, requestId) => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth;
  const baseUrl = `https://maintain-r.herokuapp.com/api/v1/users/requests/${requestId}`;
  dispatch({ type: types.LOADING });
  try {
    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });
    const data = await response.json();
    switch (data.statusCode) {
      case 200:
        dispatch({ type: types.UPDATE_REQUEST, payload: data });
        dispatch({ type: types.COMPLETE });
        toastr.success(data.message);
        break;
      default:
        dispatch({ type: types.PROCESS_ERROR });
        dispatch({ type: types.COMPLETE });
        toastr.error(data.message);
        break;
    }
  } catch (error) {
    dispatch({ type: types.NETWORK_ERROR });
    dispatch({ type: types.COMPLETE });
    toastr.error('Network error');
  }
};

const approveRequest = requestId => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth;
  const baseUrl = `https://maintain-r.herokuapp.com/api/v1/requests/${requestId}/approve`;
  dispatch({ type: types.LOADING });
  try {
    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    switch (data.statusCode) {
      case 200:
        dispatch({ type: types.APPROVE_REQUEST, payload: data });
        dispatch({ type: types.COMPLETE });
        toastr.success(data.message);
        break;
      default:
        dispatch({ type: types.PROCESS_ERROR });
        dispatch({ type: types.COMPLETE });
        toastr.error(data.message);
        break;
    }
  } catch (error) {
    dispatch({ type: types.NETWORK_ERROR });
    dispatch({ type: types.COMPLETE });
    toastr.error('Network error');
  }
};

const disapproveRequest = requestId => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth;
  const baseUrl = `https://maintain-r.herokuapp.com/api/v1/requests/${requestId}/disapprove`;
  dispatch({ type: types.LOADING });
  try {
    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    switch (data.statusCode) {
      case 200:
        dispatch({ type: types.DISAPPROVE_REQUEST, payload: data });
        dispatch({ type: types.COMPLETE });
        toastr.success(data.message);
        break;
      default:
        dispatch({ type: types.PROCESS_ERROR });
        dispatch({ type: types.COMPLETE });
        toastr.error(data.message);
        break;
    }
  } catch (error) {
    dispatch({ type: types.NETWORK_ERROR });
    dispatch({ type: types.COMPLETE });
    toastr.error('Network error');
  }
};

const resolveRequest = requestId => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth;
  const baseUrl = `https://maintain-r.herokuapp.com/api/v1/requests/${requestId}/resolve`;
  dispatch({ type: types.LOADING });
  try {
    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    switch (data.statusCode) {
      case 200:
        dispatch({ type: types.RESOLVE_REQUEST, payload: data });
        dispatch({ type: types.COMPLETE });
        toastr.success(data.message);
        break;
      default:
        dispatch({ type: types.PROCESS_ERROR });
        dispatch({ type: types.COMPLETE });
        toastr.error(data.message);
        break;
    }
  } catch (error) {
    dispatch({ type: types.NETWORK_ERROR });
    dispatch({ type: types.COMPLETE });
    toastr.error('Network error');
  }
};

export default {
  getAllRequests,
  getSingleRequest,
  createRequest,
  deleteRequest,
  updateRequest,
  approveRequest,
  disapproveRequest,
  resolveRequest,
};
