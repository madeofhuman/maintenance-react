import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { NotFound } from '../../app/containers/NotFoundContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('Not Found Component', () => {
  test('renders', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
