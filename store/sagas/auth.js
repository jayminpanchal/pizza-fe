import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { API_BASE_URL } from "../../utils/constants";
import * as actionTypes from "../actionTypes";
import { setUser, setUserError, showLoader, hideLoader } from "../actions";

function signinApi(data) {
  return axios.post(`${API_BASE_URL}login`, data, {
    headers: {
      Accept: "application/json",
    },
  });
}

function* signinActionEffect(action) {
  try {
    yield put(showLoader());
    const response = yield call(signinApi, action.payload);
    const user = response.data.status ? response.data.data : {};
    yield put(setUser(user));
  } catch (e) {
    const error =
      e.response && e.response.data
        ? e.response.data.error.message
        : "Server Error.";
    yield put(setUserError(error));
  } finally {
    yield put(hideLoader());
  }
}

export function* signinWatcher() {
  yield takeLatest(actionTypes.SIGNIN_WATCHER, signinActionEffect);
}

function signupApi(data) {
  return axios.post(`${API_BASE_URL}register`, data, {
    headers: {
      Accept: "application/json",
    },
  });
}

function* signupActionEffect(action) {
  try {
    yield put(showLoader());
    const response = yield call(signupApi, action.payload);
    const user = response.data.status ? response.data.data : {};
    yield put(setUser(user));
  } catch (e) {
    const error =
      e.response && e.response.data
        ? e.response.data.error.message
        : "Server Error.";
    yield put(setUserError(error));
  } finally {
    yield put(hideLoader());
  }
}

export function* signupWatcher() {
  yield takeLatest(actionTypes.SIGNUP_WATCHER, signupActionEffect);
}
