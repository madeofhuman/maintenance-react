import commonReducer from '../../app/reducers/commonReducer';

describe('Common Reducer Test', () => {
  test('LOADING', () => {
    const action = {
      type: 'LOADING',
    };
    const expectedState = {
      loading: true,
    };
    expect(commonReducer(undefined, action)).toEqual(expectedState);
  });
  test('COMPLETE', () => {
    const action = {
      type: 'COMPLETE',
    };
    const expectedState = {
      loading: false,
    };
    expect(commonReducer(undefined, action)).toEqual(expectedState);
  });
});
