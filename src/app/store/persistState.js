/**
 * Persists the state of the store in localStorage, retrieves it from localStorage
 * and clears it from localStorage
 */

/**
 * Persists the state of the store in localStorage
 * @param {Object} state The state to be saved to the localStorage
 */
export const saveState = (state) => {
  const serialisedState = JSON.stringify(state);
  localStorage.setItem('maintenance-react', serialisedState);
};

/**
 * Retrieves the state from localStorage
 * @returns {Object} the state
 */
export const loadState = () => {
  const state = localStorage.getItem('maintenance-react');
  const parsedState = state !== null && state !== undefined ? JSON.parse(state) : undefined;
  return parsedState;
};

/**
 * Clears the persisted state from localStorage
 */
export const clearState = () => {
  localStorage.removeItem('maintenance-react');
};
