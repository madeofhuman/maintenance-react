import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter, Switch } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import PrivateRoute from '../../app/components/PrivateRouteComponent';
import Input from '../../app/components/InputComponent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

let store;

describe('PrivateRoute Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  test('renders the component when the user is authenticated', () => {
    store = mockStore({
      auth: {
        authenticated: true,
      },
    });
    const wrapper = mount(
      <BrowserRouter>
        <Switch>
          <PrivateRoute store={store} component={Input} />
        </Switch>
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(Input)).toHaveLength(1);
  });
  test('does not render the component when the user is not authenticated', () => {
    store = mockStore({
      auth: {
        authenticated: false,
      },
    });
    const wrapper = mount(
      <BrowserRouter>
        <Switch>
          <PrivateRoute store={store} component={Input} />
        </Switch>
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(Input)).toHaveLength(0);
  });
});
