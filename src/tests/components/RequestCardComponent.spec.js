import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { BrowserRouter, Switch } from 'react-router-dom';
import RequestCard from '../../app/components/RequestCardComponent';

Enzyme.configure({ adapter: new Adapter() });

const requestInReview = {
  id: 29,
  type: 'repair',
  item: 'Yomis Head',
  model: 'N/A',
  detail: 'It spoiled.',
  status: 'in-review',
  owner: 'simonandal@gmail.com',
  created_at: '2018-10-05T09:51:47.773Z',
  updated_at: null,
};

const approvedRequest = {
  id: 29,
  type: 'repair',
  item: 'Yomis Head',
  model: 'N/A',
  detail: 'It spoiled.',
  status: 'pending',
  owner: 'simonandal@gmail.com',
  created_at: '2018-10-05T09:51:47.773Z',
  updated_at: null,
};

const resolvedRequest = {
  id: 29,
  type: 'repair',
  item: 'Yomis Head',
  model: 'N/A',
  detail: 'It spoiled.',
  status: 'resolved',
  owner: 'simonandal@gmail.com',
  created_at: '2018-10-05T09:51:47.773Z',
  updated_at: null,
};

const disapprovedRequest = {
  id: 29,
  type: 'repair',
  item: 'Yomis Head',
  model: 'N/A',
  detail: 'It spoiled.',
  status: 'disapproved',
  owner: 'simonandal@gmail.com',
  created_at: '2018-10-05T09:51:47.773Z',
  updated_at: null,
};

const requestActions = {
  approveRequest: () => jest.fn(),
  disapproveRequest: () => jest.fn(),
  resolveRequest: () => jest.fn(),
  deleteRequest: () => jest.fn(),
};

describe('RequestCard Component', () => {
  test('renders', () => {
    const wrapper = shallow(
      <RequestCard
        request={requestInReview}
        role="user"
        requestActions={requestActions}
      />,
    );
    expect(wrapper.exists()).toBe(true);
  });
  test('displays an Approve and a Disapprove button when a request is under review and the user is an admin', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Switch>
          <RequestCard
            request={requestInReview}
            role="admin"
            requestActions={requestActions}
          />
        </Switch>
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('#approve-btn')).toHaveLength(2);
    expect(wrapper.find('#disapprove-btn')).toHaveLength(2);
  });
  test('displays a resolve button when a request has been approved and the user is an admin', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Switch>
          <RequestCard
            request={approvedRequest}
            role="admin"
            requestActions={requestActions}
          />
        </Switch>
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('#resolve-btn')).toHaveLength(2);
  });
  test('displays a Request Completed messaged when a request has been resolved and the user is an admin', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Switch>
          <RequestCard
            request={resolvedRequest}
            role="admin"
            requestActions={requestActions}
          />
        </Switch>
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('input').props().value).toEqual('Request Completed');
  });
  test('displays a disapproved button when the request has been disapproved and user is an admin', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Switch>
          <RequestCard
            request={disapprovedRequest}
            role="admin"
            requestActions={requestActions}
          />
        </Switch>
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('input').props().value).toEqual('Request Disapproved');
  });
  test('displays an edit and a delete button when a request is in review and user is a user', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Switch>
          <RequestCard
            request={requestInReview}
            role="user"
            requestActions={requestActions}
          />
        </Switch>
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('#edit-btn')).toHaveLength(2);
    expect(wrapper.find('#delete-btn')).toHaveLength(2);
  });
  test('displays no action buttons when a request has been approved, disapproved or resolved and the user is a user', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Switch>
          <RequestCard
            request={approvedRequest}
            role="user"
            requestActions={requestActions}
          />
        </Switch>
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('input')).toHaveLength(0);
  });
});
