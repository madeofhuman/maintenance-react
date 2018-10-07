import types from '../actions/commonTypes';
import { clearState } from '../store/persistState';

const initialState = {
  authenticated: false,
  token: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP:
      return {
        ...state,
      };
    case types.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticated: true,
      };
    case types.LOGOUT:
      clearState();
      return {
        ...state,
        user: null,
        token: null,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
