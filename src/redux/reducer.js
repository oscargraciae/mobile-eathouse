import { combineReducers } from 'redux';

import AuthenticationReducer from '../reducers/authentication';
import UserReducer from '../reducers/user';
import CartReducer from '../reducers/cart'

export default combineReducers({
  authentication: AuthenticationReducer,
  cart: CartReducer,
  user: UserReducer,
});