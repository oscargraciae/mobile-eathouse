export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

function add(token) {
  return {
    type: LOGIN_SUCCESS,
    payload: token
  }
};

function reset() {
  return {
    type: 'RESET',
  };
}

export function login(token) {
  return async (dispatch) => {
    dispatch(add(token));
  }
}

export function logout() {
  return async (dispatch) => {
    dispatch(reset());
  }
}