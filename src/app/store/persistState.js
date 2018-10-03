/**
 * @description Persists the state of the store in localStorage, retrieves it from localStorage
 * and clears it from localStorage
 */

/**
 * @description Persists the state of the store in localStorage
 * @param {Object} state The state to be saved to the localStorage
 */
export const saveState = (state) => {
  const serialisedState = JSON.stringify(state);
  window.localStorage.setItem('maintenance-react', serialisedState);
};

/**
 * @description Retrieves the state from localStorage
 * @returns {Object} the state
 */
export const loadState = () => {
  const state = window.localStorage.getItem('maintenance-react');
  const parsedState = state !== null && state !== undefined ? JSON.parse(state) : undefined;
  return parsedState;
};

/**
 * @description Clears the persisted state from localStorage
 */
export const clearState = () => {
  window.localStorage.removeItem('maintenance-react');
};
