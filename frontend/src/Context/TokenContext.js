import React, { createContext, useReducer } from 'react';
import { getToken } from '../utils/token';

export const TokenContext = createContext();

export const tokenReducer = (state, action) => {
  const { type, payload } = action

  switch(type) {
    case 'LOGIN':
      return {
        token: payload,
        isAuthenticated: true
      }
    case 'LOGOUT':
      return {
        token: null,
        isAuthenticated: false
      }
    default:
      return state
  }
}

export const TokenProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(tokenReducer,{
    token: getToken('token'),
    isAuthenticated: false
  });

  if(getToken() !== null){
    state.isAuthenticated = true;
  }

  return (
    <TokenContext.Provider value={{ ...state, dispatch }}>
      { children }
    </TokenContext.Provider>
  )
}