import { SET_USER } from '../actions/user';
 
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}