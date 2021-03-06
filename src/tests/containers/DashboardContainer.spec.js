import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { Dashboard, mapDispatchToProps, mapStateToProps } from '../../app/containers/DashboardContainer';

Enzyme.configure({ adapter: new Adapter() });

const requests = [
  {
    id: 1,
    type: 'repair',
    item: 'Macbook Pro',
    model: '2015',
    detail: "it's stuck in a boot loop",
    owner: 'josephodina@gmail.com',
  },
  {
    id: 2,
    type: 'maintenance',
    item: 'Macbook Pro',
    model: '2015',
    detail: "it's stuck in a boot loop",
    owner: 'josephodina@gmail.com',
  },
];

const props = {
  user: {
    firstName: 'Chukwuka',
    lastName: 'Odina',
    email: 'josephodina@gmail.com',
    role: 'user',
  },
  authenticated: true,
  common: {
    loading: false,
  },
  requests: {
    requests,
    message: 'You have no requests',
  },
  history: {
    push: () => jest.fn(),
  },
  getRequests: jest.fn(),
  showModal: jest.fn(),
  hideModal: jest.fn(),
  loading: false,
};


const user = {
  firstName: 'Chukwuka',
  lastName: 'Odina',
  email: 'josephodina@gmail.com',
  role: 'user',
};

describe('App component', () => {
  test('renders the dashboard', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('renders the requests table when there are requests', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('RequestTable')).toHaveLength(1);
    expect(props.getRequests).toHaveBeenCalled();
  });
  test('renders a message instead of the table when there are no requests', () => {
    const newProps = {
      ...props,
      requests: [],
    };
    const wrapper = shallow(<Dashboard {...newProps} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('RequestTable').dive().find('p')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('redirects the user to the /admin path if they\'re an admin', () => {
    const newProps = {
      ...props,
      user: {
        ...user,
        role: 'admin',
      },
    };
    const wrapper = shallow(<Dashboard {...newProps} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("Input[name='new-request']")).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });
  test('redirects the user to the /dashboard path if they\'re a user', () => {
    const newProps = {
      ...props,
      user: {
        ...user,
        role: 'user',
      },
    };
    const wrapper = shallow(<Dashboard {...newProps} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("Input[name='new-request']")).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('displays the modal', () => {
    const newProps = {
      ...props,
      user: {
        ...user,
        role: 'user',
      },
    };
    const wrapper = shallow(<Dashboard {...newProps} />);
    const instance = wrapper.instance();
    instance.showModal();
    expect(instance.state.show).toBe(true);
  });
  test('hides the modal', () => {
    const newProps = {
      ...props,
      user: {
        ...user,
        role: 'user',
      },
    };
    const wrapper = shallow(<Dashboard {...newProps} />);
    const instance = wrapper.instance();
    instance.hideModal();
    expect(instance.state.show).toBe(false);
  });
  test('does not display the requests when no request array is supplied', () => {
    const newProps = {
      ...props,
      requests: undefined,
    };
    const wrapper = shallow(<Dashboard {...newProps} />);
    expect(wrapper.find('RequestTable')).toHaveLength(0);
  });
  test('displays the loader when requests are being fetched from the API', () => {
    const newProps = {
      ...props,
      requests: undefined,
      loading: true,
    };
    const wrapper = shallow(<Dashboard {...newProps} />);
    expect(wrapper.find('RequestTable')).toHaveLength(0);
  });
  test('maps dispatch to props', () => {
    const spy = sinon.spy();
    const mapDispatchResult = mapDispatchToProps(spy);
    mapDispatchResult.getRequests();
    expect(spy.callCount).toBe(1);
  });
  test('maps state to props', () => {
    const state = {
      auth: {
        authenticated: true,
      },
      user: {},
      common: {
        loading: false,
      },
      requests: {
        requests: [],
        message: '',
      },
    };
    const ownProps = {
      history: {},
    };
    expect(mapStateToProps(state, ownProps)).toEqual({
      authenticated: state.auth.authenticated,
      loading: state.common.loading,
      history: ownProps.history,
      requests: state.requests.requests,
      message: state.requests.message,
      user: state.auth.user,
    });
  });
});
