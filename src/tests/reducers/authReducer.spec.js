import authReducer from '../../app/reducers/authReducer';

describe('Auth Reducer Test', () => {
  test('SIGNUP', () => {
    const action = {
      type: 'SIGNUP',
      payload: {
        statusCode: 201,
        message: 'Your account was successfully created. You can log in now.',
        result: {
          id: 34,
          firstName: 'Chukwuka',
          lastName: 'Odina',
          email: 'jose.phodina@gmail.com',
        },
      },
    };
    const expectedState = {
      authenticated: false,
      token: null,
      user: null,
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test('LOGIN', () => {
    const action = {
      type: 'LOGIN',
      payload: {
        statusCode: 200,
        message: 'You\'ve been successfully logged in.',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJDaHVrd3VrYSIsImxhc3ROYW1lIjoiT2RpbmEiLCJlbWFpbCI6Impvc2VwaG9kaW5hQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTM4NTExNjI2LCJleHAiOjE1Mzg1OTgwMjZ9.QGnryggva4xC26TeVXVFNzdaWjhQPaZv3GEMduEXIhE',
        user: {
          firstName: 'Chukwuka',
          lastName: 'Odina',
          email: 'jose.phodina@gmail.com',
          role: 'user',
        },
      },
    };
    const expectedState = {
      authenticated: true,
      token: action.payload.token,
      user: action.payload.user,
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test('PROCESS ERROR', () => {
    const action = {
      type: 'PROCESS_ERROR',
      payload: 'The email josephodina@gmail.com already exists. If you are the owner, please log in.',
    };
    const expectedState = {
      authenticated: false,
      token: null,
      user: null,
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  test('LOGOUT', () => {
    const action = {
      type: 'LOGOUT',
      payload: null,
    };
    const expectedState = {
      authenticated: false,
      token: null,
      user: null,
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
});
