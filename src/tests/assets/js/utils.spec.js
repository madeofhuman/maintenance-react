import utils from '../../../app/assets/js/utils';

const user = {
  role: 'user',
};
const admin = {
  role: 'admin',
};
const history = {
  push: jest.fn(),
};
const error = 'error';
const message = 'message';
const clearMessages = jest.fn();

describe('handleLogin test', () => {
  test('returns true for undefined user, error and message', () => {
    const result = utils.handleLogin();
    expect(result).toBe(true);
  });
  test('calls clearMessages when error and message are not undefined', async () => {
    await utils.handleLogin(undefined, history, error, message, clearMessages);
    expect(clearMessages).toHaveBeenCalled();
  });
  test('calls history.push when user and message are not undefined', async () => {
    await utils.handleLogin(user, history, undefined, message, clearMessages);
    expect(history.push).toHaveBeenCalled();
  });
  test('calls history.push when admin and message are not undefined', async () => {
    await utils.handleLogin(admin, history, undefined, message, clearMessages);
    expect(history.push).toHaveBeenCalled();
  });
});
