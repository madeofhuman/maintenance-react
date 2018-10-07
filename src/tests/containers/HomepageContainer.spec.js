import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { Homepage } from '../../app/containers/HomepageContainer';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  history: jest.fn(),
  authenticated: false,
  role: null,
};

describe('Homepage component', () => {
  test('renders', () => {
    const wrapper = shallow(<Homepage {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
