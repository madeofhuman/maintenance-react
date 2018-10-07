import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import common from '../../app/actions/commonActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;

describe('COMMON ACTIONS', () => {
  beforeEach(() => {
    fetch.resetMocks();
    store = mockStore({});
  });
  test('dispatches CLEAR_MESSAGES action', async () => {
    const expectedActions = [
      { type: 'CLEAR_MESSAGES' },
    ];

    await store.dispatch(common.clearMessages());
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toEqual(expectedActions);
  });
});
