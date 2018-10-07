import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Logo from '../../app/components/LogoComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('Logo component', () => {
  test('renders', () => {
    const wrapper = shallow(<Logo />);
    expect(wrapper.exists()).toBe(true);
  });
});
