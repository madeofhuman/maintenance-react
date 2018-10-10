import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import NewRequestContainer, { NewRequest, mapDispatchToProps, mapStateToProps } from '../../app/containers/NewRequestContainer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

let store;

const props = {
  history: {},
  createRequest: jest.fn(),
  getAllRequests: jest.fn(),
  handleClose: jest.fn(),
};

const mockChangeEvent = (name, value) => ({
  target: {
    name,
    value,
  },
});

const mockSubmitEvent = {
  preventDefault: jest.fn(),
};


describe('New Request Controller', () => {
  test('renders', () => {
    const wrapper = shallow(<NewRequest />);
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('renders a request form', () => {
    store = mockStore({
      auth: {
        authenticated: false,
      },
    });
    const wrapper = mount(<NewRequestContainer store={store} {...props} />);
    expect(wrapper.find('RequestForm')).toHaveLength(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('submits a form', () => {
    const wrapper = shallow(<NewRequest {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    const instance = wrapper.instance();
    instance.state = {
      type: 'maintenance',
      item: 'Honda',
      model: 'XBF',
      detail: 'It jerks while moving',
    };
    expect(instance.state.type).toEqual('maintenance');
    instance.handleSubmit(mockSubmitEvent);
  });
  test('echoes user input', () => {
    store = mockStore({});
    const wrapper = shallow(<NewRequest {...props} />);
    const instance = wrapper.instance();
    instance.handleChange(mockChangeEvent('item', 'Honda'));
    expect(instance.state.item).toEqual('Honda');
  });
  test('maps dispatch to props', () => {
    const spy = sinon.spy();
    const mapDispatchResult = mapDispatchToProps(spy);
    mapDispatchResult.createRequest();
    mapDispatchResult.getAllRequests();
    expect(spy.callCount).toBe(2);
  });
  test('maps state to props', () => {
    expect(mapStateToProps(undefined, props)).toEqual({
      history: props.history,
    });
  });
});
