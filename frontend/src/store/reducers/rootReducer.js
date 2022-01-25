import { combineReducers } from 'redux';

import { layoutReducer } from './layoutReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  // public
  layout: layoutReducer,
  auth: authReducer,
  // TODO: userReducer,
  // TODO: branchesReducer
});
