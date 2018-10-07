import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import authenticate from '../../app/actions/authActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const user = {
  firstName: 'Chukwuka',
  lastName: 'Odina',
  email: 'josephodina@gmail.com',
  password: 'qwertyuiop',
  role: 'user',
};

const loginSuccessResponse = {
  statusCode: 200,
  error: [],
  message: 'Login successful',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJDaHVrd3VrYSIsImxhc3ROYW1lIjoiT2RpbmEiLCJlbWFpbCI6Impvc2VwaG9kaW5hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicXdlcnR5dWlvcCIsImlhdCI6MTUxNjIzOTAyMn0.eJD1VUujSbr2cHnIRIZoqPWuI7FtIQkzbzDNuCiCzfo',
  user,
};

const signupSuccessResponse = {
  statusCode: 201,
  error: [],
  message: 'Signup successful, please log in.',
};

const loginSignupFailedResponse = {
  statusCode: 400,
  error: ['invalid data'],
};

let store;

describe('User Authentication', () => {
  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore({});
  });
  test('dispatches the LOGIN action on successful login', async () => {
    await fetch.mockResponseOnce(JSON.stringify(loginSuccessResponse));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'LOGIN', payload: loginSuccessResponse },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(authenticate.authenticate(user, history, 'login'));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the SIGNUP action on successful signup', async () => {
    await fetch.mockResponseOnce(JSON.stringify(signupSuccessResponse));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'SIGNUP', payload: signupSuccessResponse },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(authenticate.authenticate(user, null, 'signup'));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the PROCESS_ERROR action on invalid data', async () => {
    await fetch.mockResponseOnce(JSON.stringify(loginSignupFailedResponse));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'PROCESS_ERROR', payload: loginSignupFailedResponse },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(authenticate.authenticate(user, null, 'signup'));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the NETWORK_ERROR action on poor network connection', async () => {
    await fetch.mockReject(JSON.stringify(loginSignupFailedResponse));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'NETWORK_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(authenticate.authenticate(user, null, 'signup'));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the LOGOUT action on logout', async () => {
    const expectedActions = [
      { type: 'LOGOUT' },
    ];

    await store.dispatch(authenticate.logout());
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
});
