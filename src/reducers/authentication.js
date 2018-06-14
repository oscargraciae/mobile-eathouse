import { LOGIN_SUCCESS } from '../actions/authentication';
 
const initialState = {
  isLogged: false,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLogged: true,
        token: action.payload
      }
    default:
      return state;
  }
}