import {
  SIGNIN_WATCHER,
  SIGNUP_WATCHER,
  SET_USER,
  SET_USER_ERROR,
  LOGOUT,
} from "../actionTypes";

export const signInWatcher = (payload) => ({
  type: SIGNIN_WATCHER,
  payload,
});

export const signUpWatcher = (payload) => ({
  payload,
  type: SIGNUP_WATCHER,
});

export const setUser = (payload) => ({
  payload,
  type: SET_USER,
});

export const setUserError = (payload) => ({
  payload,
  type: SET_USER_ERROR,
});

export const logout = (payload) => ({
  payload,
  type: LOGOUT,
});
