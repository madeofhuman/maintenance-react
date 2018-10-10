import commonReducer from '../../app/reducers/commonReducer';

describe('Common Reducer Test', () => {
  test('LOADING', () => {
    const action = {
      type: 'LOADING',
    };
    const expectedState = {
      error: undefined,
      loading: true,
      message: undefined,
    };
    expect(commonReducer(undefined, action)).toEqual(expectedState);
  });
  test('COMPLETE', () => {
    const action = {
      type: 'COMPLETE',
    };
    const expectedState = {
      error: undefined,
      loading: false,
      message: undefined,
    };
    expect(commonReducer(undefined, action)).toEqual(expectedState);
  });
  test('PROCESS_ERROR MESSAGE', () => {
    const action = {
      type: 'PROCESS_ERROR',
      payload: {
        error: 'invalid data',
        message: 'your data is invalid',
      },
    };
    const expectedState = {
      error: 'invalid data',
      loading: false,
      message: 'your data is invalid',
    };
    expect(commonReducer(undefined, action)).toEqual(expectedState);
  });
  test('NETWORK_ERROR MESSAGE', () => {
    const action = {
      type: 'NETWORK_ERROR',
      payload: {
        error: 'Network error',
        message: 'Network error',
      },
    };
    const expectedState = {
      error: 'Network error',
      loading: false,
      message: 'Network error',
    };
    expect(commonReducer(undefined, action)).toEqual(expectedState);
  });
  test('CLEAR_MESSAGES', () => {
    const action = {
      type: 'CLEAR_MESSAGES',
    };
    const expectedState = {
      error: undefined,
      loading: false,
      message: undefined,
    };
    expect(commonReducer(undefined, action)).toEqual(expectedState);
  });
  test('SIGNUP MESSAGES', () => {
    const action = {
      type: 'SIGNUP',
      payload: {
        message: 'You have signed up successfully, you can now log in',
      },
    };
    const expectedState = {
      error: undefined,
      loading: false,
      message: 'You have signed up successfully, you can now log in',
    };
    expect(commonReducer(undefined, action)).toEqual(expectedState);
  });
  test('LOGIN MESSAGES', () => {
    const action = {
      type: 'LOGIN',
      payload: {
        message: 'You have successfully logged in',
      },
    };
    const expectedState = {
      error: undefined,
      loading: false,
      message: 'You have successfully logged in',
    };
    expect(commonReducer(undefined, action)).toEqual(expectedState);
  });
});
