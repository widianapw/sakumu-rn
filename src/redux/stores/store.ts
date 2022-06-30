/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "../reducers/authReducer";
import { combineReducers, createStore } from "redux";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = combineReducers({
  authReducer: persistReducer(persistConfig, authReducer),
});

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
