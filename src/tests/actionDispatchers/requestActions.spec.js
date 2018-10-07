import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import requests from '../../app/actions/requestActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const user = {
  firstName: 'Chukwuka',
  lastName: 'Odina',
  email: 'josephodina@gmail.com',
  password: 'qwertyuiop',
  role: 'user',
};

const admin = {
  firstName: 'Chukwuka',
  lastName: 'Odina',
  email: 'josephodina@gmail.com',
  password: 'qwertyuiop',
  role: 'admin',
};

const request = {
  id: 29,
  type: 'repair',
  item: 'Yomis Head',
  model: 'N/A',
  detail: 'It spoiled.',
  status: 'pending',
  owner: 'simonandal@gmail.com',
  created_at: '2018-10-05T09:51:47.773Z',
  updated_at: null,
};

const requestsFetchSuccess = {
  statusCode: 200,
  error: [],
  message: 'Requests retrieved successfully.',
  result: [request, request],
};

const requestFetchSuccess = {
  statusCode: 200,
  error: [],
  message: 'The request was successfully retrieved',
  result: request,
};

const requestFetchFailure = {
  statusCode: 401,
  error: 'Invalid or expired access token',
  message: 'For security reasons, you have been logged out of the application. Please log in to continue using the app.',
};

const requestCreateSuccess = {
  statusCode: 201,
  error: [],
  message: 'Your request was successfully created and is pending admin approval.',
  result: {
    id: 30,
    type: 'repair',
    item: 'MacBook Pro',
    model: '2015',
    detail: 'It\'s stuck in a boot loop',
    createdAt: '2018-10-06T21:09:31.762Z',
  },
};

const requestCreateFailure = {
  statusCode: 400,
  error: 'Bad Request',
  message: 'child "detail" fails because [a detail can only contain alphabets, numbers, hyphens, apostrophes, commas, and periods, and is less than 141 characters,]',
  validation: {
    source: 'body',
    keys: [
      'detail',
    ],
  },
};

const requestDeleteSuccess = {
  statusCode: 200,
  error: [],
  message: 'The request was successfully deleted',
};

const requestDeleteFailure = {
  statusCode: 401,
  error: [],
  message: 'You have no request with that id, please try another request id',
  result: [],
};

const requestUpdateSuccess = {
  statusCode: 200,
  error: [],
  message: 'You have successfully updated the request',
  result: {
    id: 30,
    type: 'maintenance',
    item: 'MacBook Pro',
    model: '2015',
    detail: "It's stuck in a boot loop",
    status: 'in-review',
    owner: 'josephodina@gmail.com',
    created_at: '2018-10-06T21:09:31.762Z',
    updated_at: '2018-10-06T22:21:58.728Z',
  },
};

const requestUpdateFailure = {
  statusCode: 400,
  error: 'Bad Request',
  message: 'child "detail" fails because [a detail can only contain alphabets, numbers, hyphens, apostrophes, commas, and periods, and is less than 141 characters,]',
  validation: {
    source: 'body',
    keys: [
      'detail',
    ],
  },
};

const requestApprovalSuccess = {
  statusCode: 200,
  error: [],
  message: 'The request was successfully approved. Time to get to work!',
  result: {
    id: 30,
    type: 'maintenance',
    item: 'MacBook Pro',
    model: 2015,
    detail: 'It\'s stuck in a boot loop',
    status: 'pending',
    owner: 'josephodina@gmail.com',
    created_at: '2018-10-06T21:09:31.762Z',
    updated_at: '2018-10-06T22:21:58.728Z',
  },
};

const requestApprovalFailure = {
  statusCode: 404,
  error: [],
  message: 'There is no request in review with that id. Please try another request id.',
};

let store;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJDaHVrd3VrYSIsImxhc3ROYW1lIjoiT2RpbmEiLCJlbWFpbCI6Impvc2VwaG9kaW5hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicXdlcnR5dWlvcCIsImlhdCI6MTUxNjIzOTAyMn0.eJD1VUujSbr2cHnIRIZoqPWuI7FtIQkzbzDNuCiCzfo';

describe('Get All Requests Actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  test('dispatches the GET_ALL_REQUESTS action on successful fetch of requests by user', async () => {
    store = mockStore({
      auth: {
        user,
        token,
      },
    });
    await fetch.mockResponseOnce(JSON.stringify(requestsFetchSuccess));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'GET_ALL_REQUESTS', payload: { requests: requestsFetchSuccess.result, message: requestsFetchSuccess.message } },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.getAllRequests());
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the GET_ALL_REQUESTS action on successful fetch of requests by admin', async () => {
    store = mockStore({
      auth: {
        user: admin,
        token,
      },
    });
    await fetch.mockResponseOnce(JSON.stringify(requestsFetchSuccess));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'GET_ALL_REQUESTS', payload: { requests: requestsFetchSuccess.result, message: requestsFetchSuccess.message } },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.getAllRequests());
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the PROCESS_ERROR action on unsuccessful fetch of requests by user', async () => {
    store = mockStore({
      auth: {
        user,
        token: 2,
      },
    });
    await fetch.mockResponseOnce(JSON.stringify(requestFetchFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'PROCESS_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.getAllRequests());
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the NETWORK_ERROR action on poor network availability', async () => {
    store = mockStore({
      auth: {
        user: admin,
        token,
      },
    });
    await fetch.mockReject(JSON.stringify(requestFetchFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'NETWORK_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.getAllRequests());
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
});

describe('Get Single Request Actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  test('dispatches the GET_SINGLE_REQUEST action on successful fetch of requests by user', async () => {
    store = mockStore({
      auth: {
        user,
        token,
      },
    });
    await fetch.mockResponseOnce(JSON.stringify(requestFetchSuccess));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'GET_SINGLE_REQUEST', payload: { request: requestFetchSuccess.result, message: requestFetchSuccess.message } },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.getSingleRequest(29));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the GET_SINGLE_REQUEST action on successful fetch of requests by admin', async () => {
    store = mockStore({
      auth: {
        user: admin,
        token,
      },
    });
    await fetch.mockResponseOnce(JSON.stringify(requestFetchSuccess));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'GET_SINGLE_REQUEST', payload: { request: requestFetchSuccess.result, message: requestFetchSuccess.message } },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.getSingleRequest(29));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the PROCESS_ERROR action on unsuccessful fetch of request by user', async () => {
    store = mockStore({
      auth: {
        user,
        token,
      },
    });
    await fetch.mockResponseOnce(JSON.stringify(requestFetchFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'PROCESS_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.getSingleRequest(1));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the NETWORK_ERROR action on poor network availability', async () => {
    store = mockStore({
      auth: {
        user,
        token,
      },
    });
    await fetch.mockReject(JSON.stringify(requestFetchFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'NETWORK_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.getSingleRequest());
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
});

describe('Create Request Actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore({
      auth: {
        token,
      },
    });
  });
  test('dispatches the CREATE_REQUEST action on successful request creation', async () => {
    await fetch.mockResponseOnce(JSON.stringify(requestCreateSuccess));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'CREATE_REQUEST', payload: requestCreateSuccess },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.createRequest(request));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the PROCESS_ERROR action on unsuccessful request creation due to invalid data', async () => {
    await fetch.mockResponseOnce(JSON.stringify(requestCreateFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'PROCESS_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.createRequest(request));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the NETWORK_ERROR action on poor network availability', async () => {
    await fetch.mockReject(JSON.stringify(requestCreateFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'NETWORK_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.createRequest(request));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
});

describe('Delete Request Actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore({
      auth: {
        token,
      },
    });
  });
  test('dispatches the DELETE_REQUEST action on successful request deletion', async () => {
    await fetch.mockResponseOnce(JSON.stringify(requestDeleteSuccess));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'DELETE_REQUEST' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.deleteRequest(29));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the PROCESS_ERROR action on unsuccessful request deletion due to invalid data', async () => {
    await fetch.mockResponseOnce(JSON.stringify(requestDeleteFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'PROCESS_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.deleteRequest(1));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the NETWORK_ERROR action on poor network availability', async () => {
    await fetch.mockReject(JSON.stringify(requestDeleteFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'NETWORK_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.deleteRequest(29));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
});

describe('Request Update Actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore({
      auth: {
        token,
      },
    });
  });
  test('dispatches the UPDATE_REQUEST action on successful request update', async () => {
    await fetch.mockResponseOnce(JSON.stringify(requestUpdateSuccess));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'UPDATE_REQUEST', payload: requestUpdateSuccess },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.updateRequest(request));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the PROCESS_ERROR action on unsuccessful request update due to invalid data', async () => {
    await fetch.mockResponseOnce(JSON.stringify(requestUpdateFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'PROCESS_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.updateRequest(request));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the NETWORK_ERROR action on poor network availability', async () => {
    await fetch.mockReject(JSON.stringify(requestUpdateFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'NETWORK_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.updateRequest(request));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
});

describe('Request Approval Actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore({
      auth: {
        token,
      },
    });
  });
  test('dispatches the APPROVE_REQUEST action on successful request approval', async () => {
    await fetch.mockResponseOnce(JSON.stringify(requestApprovalSuccess));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'APPROVE_REQUEST', payload: requestApprovalSuccess },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.approveRequest(30));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the PROCESS_ERROR action on unsuccessful request approval due to invalid data', async () => {
    await fetch.mockResponseOnce(JSON.stringify(requestApprovalFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'PROCESS_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.approveRequest(request));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the NETWORK_ERROR action on poor network availability', async () => {
    await fetch.mockReject(JSON.stringify(requestApprovalFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'NETWORK_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.approveRequest(request));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
});

describe('Request Disapproval Actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore({
      auth: {
        token,
      },
    });
  });
  test('dispatches the DISAPPROVE_REQUEST action on successful request disapproval', async () => {
    await fetch.mockResponseOnce(JSON.stringify(requestApprovalSuccess));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'DISAPPROVE_REQUEST', payload: requestApprovalSuccess },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.disapproveRequest(30));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the PROCESS_ERROR action on unsuccessful request disapproval due to invalid data', async () => {
    await fetch.mockResponseOnce(JSON.stringify(requestApprovalFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'PROCESS_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.disapproveRequest(request));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the NETWORK_ERROR action on poor network availability', async () => {
    await fetch.mockReject(JSON.stringify(requestApprovalFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'NETWORK_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.disapproveRequest(request));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
});

describe('Request Resolution Actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore({
      auth: {
        token,
      },
    });
  });
  test('dispatches the RESOLVE_REQUEST action on successful request resolution', async () => {
    await fetch.mockResponseOnce(JSON.stringify(requestApprovalSuccess));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'RESOLVE_REQUEST', payload: requestApprovalSuccess },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.resolveRequest(30));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the PROCESS_ERROR action on unsuccessful request resolution due to invalid data', async () => {
    await fetch.mockResponseOnce(JSON.stringify(requestApprovalFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'PROCESS_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.resolveRequest(request));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
  test('dispatches the NETWORK_ERROR action on poor network availability', async () => {
    await fetch.mockReject(JSON.stringify(requestApprovalFailure));
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'NETWORK_ERROR' },
      { type: 'COMPLETE' },
    ];

    await store.dispatch(requests.resolveRequest(request));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
});
