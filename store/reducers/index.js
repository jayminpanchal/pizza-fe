import { combineReducers } from "redux";

import auth from "./auth";
import cart from "./cart";
import pizzas from "./pizzas";
import loader from "./loader";
import orders from "./orders";

export const rootReducers = combineReducers({
  authReducer: auth,
  pizzasReducer: pizzas,
  cartReducer: cart,
  loaderReducer: loader,
  ordersReducer: orders,
});
