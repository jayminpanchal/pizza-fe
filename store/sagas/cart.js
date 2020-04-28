import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { API_BASE_URL } from "../../utils/constants";
import * as actionTypes from "../actionTypes";
import {
  setCartItems,
  setCartItemsError,
  showLoader,
  hideLoader,
} from "../actions";

function fetchCartApi(uuid) {
  return axios.get(`${API_BASE_URL}cart/${uuid}`, {
    headers: {
      Accept: "application/json",
    },
  });
}

function* fetchCartActionEffect(action) {
  try {
    yield put(showLoader());
    const uuid = action.payload.uuid;
    const response = yield call(fetchCartApi, uuid);
    const pizzas = response.data.status ? response.data.data.cartItems : [];
    yield put(setCartItems(pizzas));
  } catch (e) {
    const error =
      e.response && e.response.data
        ? e.response.data
        : { message: "Server Error." };
    yield put(setCartItemsError(error));
  } finally {
    yield put(hideLoader());
  }
}

export function* fetchCartWatcher() {
  yield takeLatest(actionTypes.FETCH_CART, fetchCartActionEffect);
}

function addToCartApi(data) {
  return axios.post(`${API_BASE_URL}cart`, data, {
    headers: {
      Accept: "application/json",
    },
  });
}

function* addToCartActionEffect(action) {
  try {
    yield put(showLoader());
    const response = yield call(addToCartApi, action.payload);
    const pizzas = response.data.status ? response.data.data.cartItems : [];
    yield put(setCartItems(pizzas));
  } catch (e) {
    const error =
      e.response && e.response.data
        ? e.response.data
        : { message: "Server Error." };
    yield put(setCartItemsError(error));
  } finally {
    yield put(hideLoader());
  }
}

export function* addToCartWatcher() {
  yield takeLatest(actionTypes.ADD_TO_CART, addToCartActionEffect);
}

function updateCartApi(data) {
  return axios.put(`${API_BASE_URL}cart/${data.uuid}/${data.id}`, data, {
    headers: {
      Accept: "application/json",
    },
  });
}

function* updateCartActionEffect(action) {
  try {
    yield put(showLoader());
    const response = yield call(updateCartApi, action.payload);
    const pizzas = response.data.status ? response.data.data.cartItems : [];
    yield put(setCartItems(pizzas));
  } catch (e) {
    const error =
      e.response && e.response.data
        ? e.response.data
        : { message: "Server Error." };
    yield put(setCartItemsError(error));
  } finally {
    yield put(hideLoader());
  }
}

export function* updateCartWatcher() {
  yield takeLatest(actionTypes.UPDATE_CART, updateCartActionEffect);
}

function removeCartApi(uuid, cartId) {
  return axios.delete(`${API_BASE_URL}cart/${uuid}/${cartId}`, {
    headers: {
      Accept: "application/json",
    },
  });
}

function* removeCartActionEffect(action) {
  try {
    yield put(showLoader());
    const cartId = action.payload.id;
    const uuid = action.payload.uuid;
    const response = yield call(removeCartApi, uuid, cartId);
    const pizzas = response.data.status ? response.data.data.cartItems : [];
    yield put(setCartItems(pizzas));
  } catch (e) {
    const error =
      e.response && e.response.data
        ? e.response.data
        : { message: "Server Error." };
    yield put(setCartItemsError(error));
  } finally {
    yield put(hideLoader());
  }
}

export function* removeCartWatcher() {
  yield takeLatest(actionTypes.REMOVE_FROM_CART, removeCartActionEffect);
}
