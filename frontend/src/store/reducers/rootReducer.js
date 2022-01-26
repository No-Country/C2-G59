import { combineReducers } from 'redux';

import { layoutReducer } from './layoutReducer';
import { authReducer } from './authReducer';
import { productsReducer } from './productsReducer';

export const rootReducer = combineReducers({
  // public
  layout: layoutReducer,
  // private
  auth: authReducer,
  products: productsReducer,
  // TODO: userReducer,
  // TODO: branchesReducer
});
