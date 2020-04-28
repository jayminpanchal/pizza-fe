import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { API_BASE_URL } from "../../utils/constants";
import * as actionTypes from "../actionTypes";
import { setPizzas, setPizzasError, showLoader, hideLoader } from "../actions";

function fetchPizzasApi() {
  return axios.get(`${API_BASE_URL}pizzas`, {
    headers: {
      Accept: "application/json",
    },
  });
}

function* fetchPizzasActionEffect(action) {
  try {
    yield put(showLoader());
    const response = yield call(fetchPizzasApi);
    const pizzas = response.data.status ? response.data.data.pizzas : [];
    yield put(setPizzas(pizzas));
  } catch (e) {
    const error =
      e.response && e.response.data
        ? e.response.data
        : { message: "Server Error." };
    yield put(setPizzasError(error));
  } finally {
    yield put(hideLoader());
  }
}

export function* fetchPizzasWatcher() {
  yield takeLatest(actionTypes.FETCH_PIZZAS, fetchPizzasActionEffect);
}
