import React, { createContext, useEffect, useReducer } from "react";

export interface User {
  username: string;
  password: string;
  confirm: string;
  role: "buyer" | "seller";
  deposit: number;
}

type State = Omit<User, "password" | "confirm">;

export type Action = { type: "SET_USER"; payload: State };

export const initialState: State = {
  username: "",
  role: "buyer",
  deposit: 0,
};

export interface ContextValueType {
  user: State;
  dispatch: React.Dispatch<Action>;
}

export const UserContext = createContext<ContextValueType>({
  user: initialState,
  dispatch: () => {},
});

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, dispatch] = useReducer(reducer, initialState);
  console.log("user", user);

  const contextValue: ContextValueType = {
    user,
    dispatch,
  };

  useEffect(() => {
    try {
      const loggedUser = localStorage.getItem("user");

      const parsedLoggedUser: State = loggedUser
        ? JSON.parse(loggedUser)
        : null;

      dispatch({
        type: "SET_USER",
        payload: parsedLoggedUser,
      });
    } catch (error) {
      console.error("Error parsing logged user data:", error);
    }
  }, []);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
