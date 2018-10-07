import types from './commonTypes';

const clearMessages = () => (dispatch) => {
  dispatch({ type: types.CLEAR_MESSAGES });
};

export default {
  clearMessages,
};
