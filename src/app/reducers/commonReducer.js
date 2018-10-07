import types from '../actions/commonTypes';

const initialState = {
  loading: false,
  error: null,
  message: null,
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
    case types.PROCESS_ERROR:
    case types.NETWORK_ERROR:
      return {
        ...state,
        error: action.payload.error,
        message: action.payload.message,
      };
    case types.CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
        message: null,
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
