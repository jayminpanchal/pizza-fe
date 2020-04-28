import { FETCH_PIZZAS, SET_PIZZAS, SET_PIZZAS_ERROR } from "../actionTypes";

export const fetchPizzas = () => ({
  type: FETCH_PIZZAS,
});

export const setPizzas = (payload) => ({
  payload,
  type: SET_PIZZAS,
});

export const setPizzasError = (payload) => ({
  payload,
  type: SET_PIZZAS_ERROR,
});
