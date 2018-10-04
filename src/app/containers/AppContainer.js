import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Homepage from './HomepageContainer';
import Dashboard from './DashboardContainer';
import NotFound from './NotFoundContainer';
import store from '../store/store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/admin" exact component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
