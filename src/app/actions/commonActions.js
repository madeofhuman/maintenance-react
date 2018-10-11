import types from './commonTypes';

/**
 * An action creator that dispatches the CLEAR_MESSAGES
 * action
 */
const clearMessages = () => (dispatch) => {
  dispatch({ type: types.CLEAR_MESSAGES });
};

export default {
  clearMessages,
};
