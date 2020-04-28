import {
  FETCH_CART,
  SET_CART_ITEMS,
  SET_CART_ITEMS_ERROR,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
} from "../actionTypes";

const initialState = {
  cartItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART:
      return { ...state };
    case SET_CART_ITEMS:
      return { ...state, cartItems: [...action.payload] };
    case SET_CART_ITEMS_ERROR:
      return { ...state, cartItems: [] };
    case ADD_TO_CART:
      return { ...state, cartItems: state.cartItems.concat(action.payload) };
    case UPDATE_CART:
      return {
        ...state,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};
