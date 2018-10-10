import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../app/components/NavbarComponent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

let store;

describe('Navbar component', () => {
  test('renders', () => {
    store = mockStore({
      auth: {
        authenticated: false,
      },
    });
    const wrapper = shallow(<Navbar store={store} />);
    expect(wrapper.exists()).toBe(true);
  });
  test('renders the profile image icon when the user it authenticated', () => {
    store = mockStore({
      auth: {
        authenticated: true,
      },
    });
    const wrapper = mount(
      <BrowserRouter>
        <Navbar store={store} logout={jest.fn()} />
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.profile-icon')).toHaveLength(1);
    wrapper.find('.profile-icon a').simulate('click');
  });
  test('does not render the profile image icon when the user it not authenticated', () => {
    store = mockStore({
      auth: {
        authenticated: false,
      },
    });
    const wrapper = mount(
      <BrowserRouter>
        <Navbar store={store} />
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.profile-icon')).toHaveLength(0);
  });
});
