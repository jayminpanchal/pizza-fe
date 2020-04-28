import { FETCH_PIZZAS, SET_PIZZAS, SET_PIZZAS_ERROR } from "../actionTypes";

const initialState = {
  pizzas: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PIZZAS:
      return { ...state };
    case SET_PIZZAS:
      return { ...state, pizzas: [...action.payload] };
    case SET_PIZZAS_ERROR:
      return { ...state, pizzas: [] };
    default:
      return { ...state };
  }
};
