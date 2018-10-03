import types from '../actions/commonTypes';

const initialState = {
  requests: [],
  request: {},
  message: '',
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_REQUESTS:
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
    case types.GET_ALL_REQUESTS_ADMIN:
      return {
        ...state,
        requests: [...action.payload.requests],
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default requestReducer;
