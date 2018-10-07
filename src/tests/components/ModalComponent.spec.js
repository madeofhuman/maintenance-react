import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Modal from '../../app/components/ModalComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('Modal component', () => {
  test('renders when show prop is true', () => {
    const wrapper = shallow(<Modal show><div>Hi</div></Modal>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div')).toHaveLength(2);
  });
  test('does not render when show prop is false', () => {
    const wrapper = shallow(<Modal show={false}><div>Hi</div></Modal>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.hasClass('display-block')).toBe(false);
    expect(wrapper.hasClass('display-none')).toBe(true);
  });
});
