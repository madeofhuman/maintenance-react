import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import { BrowserRouter } from 'react-router-dom';
import { RequestForm } from '../../app/components/RequestForm';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

let store;

const createRequest = jest.fn();
const updateRequest = jest.fn();
const handleChange = jest.fn();
const getAllRequests = jest.fn();
const initialValues = {
  id: 1,
  type: 'repair',
  item: 'Macbook Pro',
  model: '2015',
  detail: 'it is stuck in a boot loop',
};

describe('Request Form', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  test('renders', () => {
    store = mockStore({
      auth: {
        authenticated: true,
      },
    });
    const wrapper = shallow(<RequestForm store={store} />);
    expect(wrapper.exists()).toBe(true);
  });
  test('renders a form', () => {
    const wrapper = mount(
      <BrowserRouter>
        <RequestForm store={store} />
      </BrowserRouter>,
    );
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('instantiates with initial values when called as an update form', () => {
    const wrapper = shallow(<RequestForm initialValues={initialValues} />);
    expect(wrapper.find('#item')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Input[name='item']").props().value).toEqual(initialValues.item);
  });
  test('when the form is submitted, the event is cancelled', () => {
    const wrapper = shallow(
      <RequestForm
        initialValues={initialValues}
        updateRequest={updateRequest}
        getAllRequests={getAllRequests}
      />,
    );
    let prevented = false;
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {
        prevented = true;
      },
    });
    expect(prevented).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  test('calls the updateRequest method on request update', () => {
    const wrapper = shallow(
      <RequestForm
        initialValues={initialValues}
        updateRequest={updateRequest}
        getAllRequests={getAllRequests}
        createRequest={createRequest}
      />,
    );
    wrapper.find('form').simulate('submit', {
      preventDefault: () => jest.fn(),
    });
    expect(updateRequest).toHaveBeenCalled();
    expect(createRequest).not.toHaveBeenCalled();
  });
});
