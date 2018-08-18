export const SET_USER = 'SET_USER';

function add(user) {
  return {
    type: SET_USER,
    payload: user
  }
};

export function setUser(user) {
  return async (dispatch) => {
    dispatch(add(user));
  }
}