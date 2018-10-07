import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import RequestTable from '../../app/components/RequestTableComponent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

let store;

const requests = [
  {
    id: 29,
    type: 'repair',
    item: 'Yomis Head',
    model: 'N/A',
    detail: 'It spoiled.',
    status: 'in-review',
    owner: 'simonandal@gmail.com',
    created_at: '2018-10-05T09:51:47.773Z',
    updated_at: null,
  },
  {
    id: 29,
    type: 'repair',
    item: 'Yomis Head',
    model: 'N/A',
    detail: 'It spoiled.',
    status: 'pending',
    owner: 'simonandal@gmail.com',
    created_at: '2018-10-05T09:51:47.773Z',
    updated_at: null,
  },
];

describe('Request Table', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  test('renders', () => {
    store = mockStore({
      auth: {
        authenticated: false,
      },
    });
    const wrapper = shallow(<RequestTable store={store} requests={requests} />);
    expect(wrapper.exists()).toBe(true);
  });
  test('renders a table', () => {
    const wrapper = mount(
      <BrowserRouter>
        <RequestTable store={store} requests={requests} />
      </BrowserRouter>,
    );
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('renders a message if empty requests', () => {
    const wrapper = mount(
      <BrowserRouter>
        <RequestTable store={store} requests={[]} message="Nothing to see here" />
      </BrowserRouter>,
    );
    expect(wrapper.find('table')).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });
});
