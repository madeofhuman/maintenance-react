import toastr from 'toastr';

/**
 * Contains utility functions that are reused across the site
 */
const utils = {
  /**
   * redirects the user or admin to their dashboard upon successful login
   * or toast an error message.
   * @param {object} user - the user object in the store
   * @param {object} history - the user API for redirection
   * @param {string} error - the error title object gotten from the store
   * @param {string} message - the success or error message gotten from the store
   */
  handleLogin: (
    user, history, error, message, clearMessages,
  ) => {
    if (user === undefined && error === undefined && message === undefined) {
      return true;
    }
    if (user === undefined && error !== undefined && message !== undefined) {
      toastr.error(message);
      clearMessages();
    }
    if (user !== undefined && error === undefined && message !== undefined) {
      if (user.role !== 'user') {
        history.push('/admin');
        toastr.success(message);
        clearMessages();
      } else {
        history.push('/dashboard');
        toastr.success(message);
        clearMessages();
      }
    }
  },
};

export default utils;
