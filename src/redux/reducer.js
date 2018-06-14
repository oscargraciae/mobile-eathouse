import { combineReducers } from 'redux';

import AuthenticationReducer from '../reducers/authentication';
import CartReducer from '../reducers/cart'

export default combineReducers({
  authentication: AuthenticationReducer,
  cart: CartReducer,
});