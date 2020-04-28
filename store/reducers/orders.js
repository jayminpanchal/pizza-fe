import {
  FETCH_ORDERS,
  SET_ORDERS,
  SET_ORDERS_ERROR,
  PLACE_ORDER,
  PLACE_ORDER_ERROR,
  PLACE_ORDER_SUCCESS,
  LOGOUT,
} from "../actionTypes";

const initialState = {
  orders: [],
  success: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER:
      return {
        ...state,
        success: null,
        error: null,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        success: action.payload.message,
        error: null,
      };
    case PLACE_ORDER_ERROR:
      return {
        ...state,
        success: null,
        error: action.payload.message,
      };
    case FETCH_ORDERS:
      return { ...state };
    case SET_ORDERS:
      return { ...state, orders: [...action.payload] };
    case SET_ORDERS_ERROR:
      return { ...state, orders: [] };
    case LOGOUT:
      return { ...state, orders: [] };
    default:
      return { ...state };
  }
};
