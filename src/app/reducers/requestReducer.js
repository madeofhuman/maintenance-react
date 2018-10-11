import types from '../actions/commonTypes';

/**
 * The initial state of the requests reducer
 */
const initialState = {
  requests: undefined,
  request: undefined,
  message: undefined,
};

/**
 * Handles the request actions
 */
const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_REQUESTS:
    case types.GET_ALL_REQUESTS_ADMIN:
      return {
        ...state,
        requests: [...action.payload.requests],
        message: action.payload.message,
      };
    case types.GET_SINGLE_REQUEST:
      return {
        ...state,
        request: action.payload.request,
        message: action.payload.message,
      };
    case types.CREATE_REQUEST:
    case types.UPDATE_REQUEST:
    case types.APPROVE_REQUEST:
    case types.DISAPPROVE_REQUEST:
    case types.RESOLVE_REQUEST:
      return {
        ...state,
        request: action.payload.result,
        message: action.payload.message,
      };
    case types.DELETE_REQUEST:
      return state;
    default:
      return state;
  }
};

export default requestReducer;
