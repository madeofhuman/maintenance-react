import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProfileIcon from '../../app/components/ProfileIcon';

Enzyme.configure({ adapter: new Adapter() });

describe('ProfileIcon component', () => {
  it('renders', () => {
    const wrapper = shallow(<ProfileIcon />);
    expect(wrapper.exists()).toBe(true);
  });
});
