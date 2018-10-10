import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { RequestForm } from '../../app/components/RequestForm';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

let store;

const createRequest = jest.fn();
const updateRequest = jest.fn();
const getAllRequests = jest.fn();
const initialValues = {
  id: 1,
  type: 'repair',
  item: 'Macbook Pro',
  model: '2015',
  detail: 'it is stuck in a boot loop',
};

describe('Request Form', () => {
  test('renders a form', () => {
    store = mockStore({
      auth: {
        authenticated: true,
      },
    });
    const wrapper = shallow(<RequestForm />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('instantiates with initial values when called as an update form', () => {
    const wrapper = shallow(<RequestForm {...initialValues} />);
    expect(wrapper.find('#item')).toHaveLength(1);
    expect(wrapper.find('#item').props().value).toEqual(initialValues.item);
    expect(wrapper).toMatchSnapshot();
  });
});
