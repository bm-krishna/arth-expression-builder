import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import expressionReducer from "../features/expresson/expressionSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    expression: expressionReducer,
  },
});
