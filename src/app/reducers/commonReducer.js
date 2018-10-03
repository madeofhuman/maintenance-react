import types from '../actions/commonTypes';

const initialState = {
  loading: false,
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
    default:
      return state;
  }
};

export default commonReducer;
