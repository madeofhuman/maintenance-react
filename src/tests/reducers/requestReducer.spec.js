import requestReducer from '../../app/reducers/requestReducer';

describe('Request Reducer Test', () => {
  test('GET ALL REQUESTS', () => {
    const action = {
      type: 'GET_ALL_REQUESTS',
      payload: {
        requests: [],
        message: 'You have no requests at the moment',
      },
    };
    const expectedState = {
      requests: [],
      request: {},
      message: 'You have no requests at the moment',
    };
    expect(requestReducer(undefined, action)).toEqual(expectedState);
  });
  test('GET SINGLE REQUEST', () => {
    const action = {
      type: 'GET_SINGLE_REQUEST',
      payload: {
        request: {},
        message: 'You have no requests at the moment',
      },
    };
    const expectedState = {
      requests: [],
      request: {},
      message: 'You have no requests at the moment',
    };
    expect(requestReducer(undefined, action)).toEqual(expectedState);
  });
  test('GET ALL REQUESTS ADMIN', () => {
    const action = {
      type: 'GET_ALL_REQUESTS_ADMIN',
      payload: {
        requests: [],
        message: 'There are no requests at the moment',
      },
    };
    const expectedState = {
      requests: [],
      request: {},
      message: 'There are no requests at the moment',
    };
    expect(requestReducer(undefined, action)).toEqual(expectedState);
  });
});
