import reducers from '../../app/reducers';

describe('Combine reducer test', () => {
  test('Combine Reducer', () => {
    expect(typeof reducers).toBe('function');
  });
});
