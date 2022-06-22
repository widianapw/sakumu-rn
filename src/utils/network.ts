/**
 * Created by Widiana Putra on 22/06/2022
 * Copyright (c) 2022 - Made with love
 */
import axios from "axios";
import env from "../env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKey from "./StorageKey";

const getLocale = async () => {
  try {
    const locale = await AsyncStorage.getItem(StorageKey.LOCALE);
    return locale ?? "en";
  } catch (e) {
    return "en";
  }
};
const client = axios.create({
  baseURL: env.BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-App-Locale": "en",

  },
});

client.interceptors.request.use(
  async (config) => {
    // config.baseURL = await getBaseUrl();
    // config?.headers?.common = { ...config?.headers?.common, "X-App-Locale": await getLocale() };
    config.headers.common = { ...config.headers.common, 'X-App-Locale': await getLocale() };
    // config.headers["X-App-Locale"] = await getLocale();
    const printable = `--Request--\nMethod: ${config?.method?.toUpperCase()} \nURL: ${
      config.baseURL
    }${config.url}\nHeaders:${JSON.stringify(config?.headers?.common)} \nParams: ${JSON.stringify(
      config.params,
      null,
      2,
    )} \nData: ${JSON.stringify(config.data, null, 2)}`;
    console.log(printable);
    return config;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => {
    const printable = `--Response--\nStatus: ${response.status} \nResponse: ${JSON.stringify(
      response.data,
      null,
      2,
    )}`;
    console.log(printable);
    return response.data;
  },
  (error) => Promise.reject((error.response && error.response.data) || "Something went wrong"),
);

export { client };


