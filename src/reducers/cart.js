import { SET_ITEM, UPDATE_ITEM, REMOVE_ITEM, CLEAR_ITEMS } from '../actions/cart';

const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_ITEM: 
      return {
        data: [...state.data, action.payload],
        persistExpiresAt: action.date,
      }
    case UPDATE_ITEM:
      return {
        data: [
          ...state.data.slice(0, action.index),
          Object.assign({}, state.data[action.index], action.payload), ...state.data.slice(action.index + 1)
        ],
        persistExpiresAt: action.date,
      }
    case REMOVE_ITEM:
      return {
        data: [
          ...state.data.slice(0, action.index),
          ...state.data.slice(action.index + 1)
        ]
      }
    case CLEAR_ITEMS:
      return {
        data: [],
      }
    default:
      return state;
  }
}