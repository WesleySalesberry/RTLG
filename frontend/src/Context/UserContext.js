import React, { createContext, useReducer } from 'react';
import { getToken } from '../utils/token';


export const UserContext = createContext();

export const userReducer = (state, action) => {
  const { type, payload } = action

  switch(type) {
    case 'PROFILE':
      return {
        user: payload,
      }
    case 'REMOVE':
      return {
        user: null
      }
    default:
      return state
  }
}

export const UserProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(userReducer,{
    user: getToken('user'),
  });

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      { children }
    </UserContext.Provider>
  )
}