import types from '../actions/commonTypes';

const initialState = {
  loading: false,
  error: undefined,
  message: undefined,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.COMPLETE:
      return {
        ...state,
        loading: false,
      };
    case types.NETWORK_ERROR:
      return {
        ...state,
        error: 'Network error',
        message: 'Network error',
      };
    case types.PROCESS_ERROR:
      return {
        ...state,
        error: action.payload.error,
        message: action.payload.message,
      };
    case types.CLEAR_MESSAGES:
      return {
        ...state,
        error: undefined,
        message: undefined,
      };
    case types.SIGNUP:
    case types.LOGIN:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default commonReducer;
