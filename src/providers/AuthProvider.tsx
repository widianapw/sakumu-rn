/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { createContext, useContext, useState } from "react";
import { LoginResponse, User } from "../models/auth/Auth";
import useBaseService from "../services/useBaseService";
import { useBottomSheet } from "../../tmd/providers/BottomSheetProvider";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKey from "../utils/StorageKey";

export type AuthContextType = {
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoadingLogin: boolean;
  isLoadingLogout: boolean;
  isAuthenticated: boolean;
  user?: User
}
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: any) => {
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
  const user = useSelector(state => state.authReducer.user);

  const dispatch = useDispatch();
  const { postAPI } = useBaseService();
  const { showErrorBS } = useBottomSheet();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setIsLoadingLogin(true);
      const res = await postAPI<LoginResponse>("auth/login", {
        email, password,
      });
      await AsyncStorage.setItem(StorageKey.ACCESS_TOKEN, res.data.token);
      dispatch({
        type: "LOGIN",
        payload: {
          user: res.data.user,
        },
      });
      setIsLoadingLogin(false);
    } catch (e) {
      setIsLoadingLogin(false);
      showErrorBS(e);
    }
  };

  const logout = async () => {
    try {
      setIsLoadingLogout(true);
      await AsyncStorage.setItem(StorageKey.ACCESS_TOKEN, "");
      dispatch({
        type: "LOGOUT",
      });
      setIsLoadingLogout(false);
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
      setIsLoadingLogout(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoadingLogin,
        isLoadingLogout,
        isAuthenticated,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context must be use inside AuthProvider");
  return context;
};

export default AuthProvider;
