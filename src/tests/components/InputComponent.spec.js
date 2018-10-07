import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Input from '../../app/components/InputComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('Input component', () => {
  test('renders', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.exists()).toBe(true);
  });
  test('user text is echoed', () => {
    const wrapper = shallow(<Input type="text" value="hello" />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input').props().value).toEqual('hello');
  });
});
