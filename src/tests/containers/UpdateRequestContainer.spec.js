import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import UpdateRequestContainer, { UpdateRequest, mapDispatchToProps, mapStateToProps } from '../../app/containers/UpdateRequestContainer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

let store;

const props = {
  history: {
    push: jest.fn(),
  },
  loading: true,
  match: {},
  error: undefined,
  updateRequest: jest.fn(),
  getRequest: jest.fn(),
  handleClose: jest.fn(),
  initialValues: {
    id: 1,
    type: 'maintenance',
    item: 'Honda',
    model: 'Accord 2015',
    detail: 'Routine maintenance',
  },
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


describe('Update Request Controller', () => {
  test('renders', () => {
    const wrapper = shallow(<UpdateRequest {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('renders a request form', () => {
    store = mockStore({
      common: {
        error: false,
      },
    });
    const wrapper = mount(<UpdateRequestContainer store={store} {...props} />);
    expect(wrapper.find('RequestForm')).toHaveLength(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('submits a form', () => {
    const wrapper = shallow(<UpdateRequest {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    const instance = wrapper.instance();
    instance.state = props.initialValues;
    expect(instance.state.type).toEqual('maintenance');
    instance.handleSubmit(mockSubmitEvent);
  });
  test('echoes user input', () => {
    store = mockStore({});
    const wrapper = shallow(<UpdateRequest {...props} />);
    const instance = wrapper.instance();
    instance.handleChange(mockChangeEvent('item', 'Honda'));
    expect(instance.state.item).toEqual('Honda');
  });
  test('displays loader when network action is being performed', () => {
    const wrapper = shallow(<UpdateRequest {...props} />);
    expect(wrapper.find('Loader')).toHaveLength(1);
  });
  test('maps dispatch to props', () => {
    const spy = sinon.spy();
    const mapDispatchResult = mapDispatchToProps(spy);
    mapDispatchResult.updateRequest();
    mapDispatchResult.getRequest();
    expect(spy.callCount).toBe(2);
  });
  test('maps state to props', () => {
    const state = {
      common: {
        error: undefined,
        loading: false,
      },
    };
    expect(mapStateToProps(state)).toEqual({
      error: state.common.error,
      loading: state.common.loading,
    });
  });
});
