/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { createContext, useContext, useEffect, useState } from "react";
import { I18nextProvider, TFunction, useTranslation as useTranslationi18n } from "react-i18next";
import StorageKey from "../utils/StorageKey";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../utils/i18n";

type LocaleProviderType = {
  changeLanguage: (lang: string) => void;
  currentLanguage: string;
  t: TFunction<"translation", undefined>;
}
const initialState: LocaleProviderType = {
  changeLanguage: (lang: string) => {
  },
  currentLanguage: "en",
  t: () => {
  },
};

export const LocaleContext = createContext(initialState);
export const useLocale = () => useContext(LocaleContext);

const LocaleChildProvider = ({ children }: any) => {
  const { i18n, t } = useTranslationi18n();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const changeLanguage = (lang: string) => {
    AsyncStorage.setItem(StorageKey.LOCALE, lang);
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const changeLanguageAsync = async () => {
    const lang = await AsyncStorage.getItem(StorageKey.LOCALE) ?? currentLanguage;
    changeLanguage(lang);
  };

  useEffect(() => {
    changeLanguageAsync();
  }, []);

  return (
    <LocaleContext.Provider value={{ changeLanguage, currentLanguage, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

const LocaleProvider = ({ children }: any) => {
  return (
    <I18nextProvider i18n={i18n}>
      <LocaleChildProvider>
        {children}
      </LocaleChildProvider>
    </I18nextProvider>
  );
};

export default LocaleProvider;
