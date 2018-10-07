import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { LoginForm } from '../../app/containers/LoginContainer';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  handleClose: jest.fn(),
  login: jest.fn(),
  clearMessages: jest.fn(),
  history: {
    push: jest.fn(),
  },
  loading: false,
  user: {
    firstName: 'Chukwuka',
    lastName: 'Odina',
    email: 'josephodina@gmail.com',
    role: 'user',
  },
  message: null,
  error: null,
};

describe('Login form component', () => {
  test('renders', () => {
    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
