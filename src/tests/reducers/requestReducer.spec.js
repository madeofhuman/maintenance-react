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
  test('CREATE A REQUEST', () => {
    const action = {
      type: 'CREATE_REQUEST',
      payload: {
        result: {
          type: 'repair',
          item: 'Phillips Iron',
          model: 'N/A',
          detail: 'It does not turn on',
        },
        message: '',
      },
    };
    const expectedState = {
      requests: [],
      request: {
        type: 'repair',
        item: 'Phillips Iron',
        model: 'N/A',
        detail: 'It does not turn on',
      },
      message: '',
    };
    expect(requestReducer(undefined, action)).toEqual(expectedState);
  });
  test('UPDATE A REQUEST', () => {
    const action = {
      type: 'UPDATE_REQUEST',
      payload: {
        result: {
          type: 'repair',
          item: 'Phillips Iron',
          model: 'N/A',
          detail: 'It does not turn on',
        },
        message: '',
      },
    };
    const expectedState = {
      requests: [],
      request: {
        type: 'repair',
        item: 'Phillips Iron',
        model: 'N/A',
        detail: 'It does not turn on',
      },
      message: '',
    };
    expect(requestReducer(undefined, action)).toEqual(expectedState);
  });
  test('APPROVE A REQUEST', () => {
    const action = {
      type: 'APPROVE_REQUEST',
      payload: {
        result: {
          type: 'repair',
          item: 'Phillips Iron',
          model: 'N/A',
          detail: 'It does not turn on',
        },
        message: '',
      },
    };
    const expectedState = {
      requests: [],
      request: {
        type: 'repair',
        item: 'Phillips Iron',
        model: 'N/A',
        detail: 'It does not turn on',
      },
      message: '',
    };
    expect(requestReducer(undefined, action)).toEqual(expectedState);
  });
  test('DISAPPROVE A REQUEST', () => {
    const action = {
      type: 'DISAPPROVE_REQUEST',
      payload: {
        result: {
          type: 'repair',
          item: 'Phillips Iron',
          model: 'N/A',
          detail: 'It does not turn on',
        },
        message: '',
      },
    };
    const expectedState = {
      requests: [],
      request: {
        type: 'repair',
        item: 'Phillips Iron',
        model: 'N/A',
        detail: 'It does not turn on',
      },
      message: '',
    };
    expect(requestReducer(undefined, action)).toEqual(expectedState);
  });
  test('RESOLVE A REQUEST', () => {
    const action = {
      type: 'RESOLVE_REQUEST',
      payload: {
        result: {
          type: 'repair',
          item: 'Phillips Iron',
          model: 'N/A',
          detail: 'It does not turn on',
        },
        message: '',
      },
    };
    const expectedState = {
      requests: [],
      request: {
        type: 'repair',
        item: 'Phillips Iron',
        model: 'N/A',
        detail: 'It does not turn on',
      },
      message: '',
    };
    expect(requestReducer(undefined, action)).toEqual(expectedState);
  });
  test('DELETE A REQUEST', () => {
    const action = {
      type: 'DELETE_REQUEST',
    };
    const expectedState = {
      requests: [],
      request: {},
      message: '',
    };
    expect(requestReducer(undefined, action)).toEqual(expectedState);
  });
});
