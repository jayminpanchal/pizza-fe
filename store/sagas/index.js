import { all } from "redux-saga/effects";

import { fetchPizzasWatcher } from "./pizzas";
import {
  addToCartWatcher,
  updateCartWatcher,
  fetchCartWatcher,
  removeCartWatcher,
} from "./cart";
import { placeOrderWatcher, fetchOrdersWatcher } from "./orders";
import { signinWatcher, signupWatcher } from "./auth";

export default function* rootSaga() {
  yield all([
    fetchPizzasWatcher(),
    addToCartWatcher(),
    updateCartWatcher(),
    fetchCartWatcher(),
    removeCartWatcher(),
    placeOrderWatcher(),
    fetchOrdersWatcher(),
    signinWatcher(),
    signupWatcher(),
  ]);
}
