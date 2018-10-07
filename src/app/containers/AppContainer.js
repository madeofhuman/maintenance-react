import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Homepage from './HomepageContainer';
import Dashboard from './DashboardContainer';
import NotFound from './NotFoundContainer';
import ViewRequest from './ViewRequestContainer';
import store from '../store/store';
import PrivateRoute from '../components/PrivateRouteComponent';

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/admin" component={Dashboard} />
        <PrivateRoute exact path="/view/:requestId" component={ViewRequest} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
