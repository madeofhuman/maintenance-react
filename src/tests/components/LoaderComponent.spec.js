import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Loader from '../../app/components/LoaderComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('Loader component', () => {
  test('renders', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.exists()).toBe(true);
  });
});
