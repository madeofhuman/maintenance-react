import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { ViewRequest } from '../../app/containers/ViewRequestContainer';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  request: {
    id: 1,
    type: 'repair',
    item: 'Macbook Pro',
    model: '2015',
    detail: "it's stuck in a boot loop",
    owner: 'josephodina@gmail.com',
  },
  getRequest: jest.fn(),
  loading: false,
  user: {
    firstName: 'Chukwuka',
    lastName: 'Odina',
    email: 'josephodina@gmail.com',
    role: 'user',
  },
  match: {
    params: {
      requestId: 1,
    },
  },
  deleteRequest: jest.fn(),
  approveRequest: jest.fn(),
  disapproveRequest: jest.fn(),
  resolveRequest: jest.fn(),
};

describe('View Request Component', () => {
  test('renders', () => {
    const wrapper = shallow(<ViewRequest {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
