import { combineReducers } from 'redux';
import auth from './authReducer';
import common from './commonReducer';
import requests from './requestReducer';

export default combineReducers({
  auth,
  common,
  requests,
});
