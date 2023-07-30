import React, { useReducer } from "react";
import { Button } from "@mui/material";

type State = typeof initialState;

export type Action = { type: "INCREMENT" } | { type: "DECREMENT" };

const initialState = { count: 0 };

const reducerCounter = (state: State, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count !== 0 ? state.count - 1 : (state.count = 0) };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducerCounter, initialState);

  return (
    <div>
      <h2>{state.count}</h2>
      <Button
        onClick={() => {
          dispatch({ type: "DECREMENT" });
        }}
      >
        <b>-</b>
      </Button>
      <Button
        onClick={() => {
          dispatch({ type: "INCREMENT" });
        }}
      >
        <b>+</b>
      </Button>
    </div>
  );
};
export default Counter;
