import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";

import { API_BASE_URL } from "../../utils/constants";
import * as actionTypes from "../actionTypes";
import {
  placeOrderSuccess,
  placeOrderError,
  setOrders,
  setOrdersError,
  showLoader,
  hideLoader,
} from "../actions";

function placeOrderApi(data) {
  return axios.post(`${API_BASE_URL}order`, data, {
    headers: {
      Accept: "application/json",
    },
  });
}

function* placeOrderActionEffect(action) {
  try {
    yield put(showLoader());
    const response = yield call(placeOrderApi, action.payload);
    yield put(placeOrderSuccess({ message: response.data.data.message }));
  } catch (e) {
    yield put(placeOrderError({ message: "Order failed." }));
  } finally {
    yield put(hideLoader());
  }
}

export function* placeOrderWatcher() {
  yield takeLatest(actionTypes.PLACE_ORDER, placeOrderActionEffect);
}

export const getToken = (state) => state.authReducer.token;

function fetchOrdersApi(token) {
  return axios.get(`${API_BASE_URL}orders`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function* fetchOrdersActionEffect() {
  try {
    yield put(showLoader());
    const token = yield select(getToken);
    const response = yield call(fetchOrdersApi, token);
    const orders = response.data.status ? response.data.data.orders : [];
    yield put(setOrders(orders));
  } catch (e) {
    console.log("error", e);
    const error =
      e.response && e.response.data
        ? e.response.data
        : { message: "Server Error." };
    yield put(setOrdersError(error));
  } finally {
    yield put(hideLoader());
  }
}

export function* fetchOrdersWatcher() {
  yield takeLatest(actionTypes.FETCH_ORDERS, fetchOrdersActionEffect);
}
