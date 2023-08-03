import React, { createContext, useEffect, useReducer, useMemo } from 'react';
import { User } from '../Utils/API/auth';
import logger from '../Utils/logger';

type State = Omit<User, 'password' | 'confirm' | 'token'>;

export type Action = { type: 'SET_USER'; payload: State };

export const initialState: State = {
  id: '',
  username: '',
  role: 'buyer',
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

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USER':
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

  const contextValue: ContextValueType = useMemo(
    () => ({
      user,
      dispatch,
    }),
    [user]
  );

  useEffect(() => {
    try {
      const loggedUser = localStorage.getItem('user');

      const parsedLoggedUser: State = loggedUser ? JSON.parse(loggedUser) : null;

      dispatch({
        type: 'SET_USER',
        payload: parsedLoggedUser,
      });
    } catch (error) {
      logger.error(error);
    }
  }, []);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
