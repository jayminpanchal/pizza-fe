import {
  FETCH_CART,
  SET_CART_ITEMS,
  SET_CART_ITEMS_ERROR,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
} from "../actionTypes";

export const fetchCart = (payload) => ({
  type: FETCH_CART,
  payload,
});

export const setCartItems = (payload) => ({
  payload,
  type: SET_CART_ITEMS,
});

export const setCartItemsError = (payload) => ({
  payload,
  type: SET_CART_ITEMS_ERROR,
});

export const addToCart = (payload) => ({
  payload,
  type: ADD_TO_CART,
});

export const updateCart = (payload) => ({
  payload,
  type: UPDATE_CART,
});

export const removeFromCart = (payload) => ({
  payload,
  type: REMOVE_FROM_CART,
});
