import {
  PLACE_ORDER,
  PLACE_ORDER_ERROR,
  PLACE_ORDER_SUCCESS,
  FETCH_ORDERS,
  SET_ORDERS,
  SET_ORDERS_ERROR,
} from "../actionTypes";

export const placeOrder = (payload) => ({
  type: PLACE_ORDER,
  payload,
});

export const placeOrderSuccess = (payload) => ({
  payload,
  type: PLACE_ORDER_SUCCESS,
});

export const placeOrderError = (payload) => ({
  payload,
  type: PLACE_ORDER_ERROR,
});

export const fetchOrders = (payload) => ({
  type: FETCH_ORDERS,
  payload,
});

export const setOrders = (payload) => ({
  payload,
  type: SET_ORDERS,
});

export const setOrdersError = (payload) => ({
  payload,
  type: SET_ORDERS_ERROR,
});
