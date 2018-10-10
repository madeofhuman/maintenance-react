import types from '../actions/commonTypes';
import { clearState } from '../store/persistState';

const initialState = {
  authenticated: false,
  token: undefined,
  user: undefined,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP:
    case types.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticated: true,
      };
    case types.LOGOUT:
      clearState();
      window.location.replace('/');
      break;
    default:
      return state;
  }
};

export default authReducer;
