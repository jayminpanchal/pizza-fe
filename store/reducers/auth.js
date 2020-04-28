import { SET_USER, SET_USER_ERROR, LOGOUT } from "../actionTypes";

const initialState = {
  user: null,
  token: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload, error: null };
    case SET_USER_ERROR:
      return { ...state, error: action.payload, user: null };
    case LOGOUT: {
      return { ...initialState };
    }
    default:
      return { ...state };
  }
};
