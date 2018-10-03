import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import rootReducer from '../reducers';
import { loadState, saveState } from './persistState';

const initialState = loadState();

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

/**
 * update the state of the store in localStorage every second
 */
store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export default store;
