import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { SignupForm } from '../../app/containers/SignupContainer';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  handleClose: jest.fn(),
  signup: jest.fn(),
  clearMessages: jest.fn(),
  loading: false,
  message: null,
  error: null,
};

describe('Login form component', () => {
  test('renders', () => {
    const wrapper = shallow(<SignupForm {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
