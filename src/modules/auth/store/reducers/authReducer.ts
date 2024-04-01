import {User} from '../../domain/interfaces/Auth';

/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */

export type AuthState = {
  isAuthenticated: boolean;
  user?: User;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
};

export const AUTH_REDUCER_KEY = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  INITIALIZE: 'INITIALIZE',
};

const authReducer = (state: AuthState = initialState, action: any) => {
  switch (action.type) {
    case AUTH_REDUCER_KEY.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case AUTH_REDUCER_KEY.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    case AUTH_REDUCER_KEY.INITIALIZE:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
      };
    default:
      return state;
  }
};
export default authReducer;
