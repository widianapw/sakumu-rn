/**
 * Created by Widiana Putra on 20/05/2022
 * Copyright (c) 2022 - Made with love
 */

import React from "react";
import theme, { ThemeContextType } from "../style/theme";

export const ThemeContext = React.createContext<ThemeContextType | null>(theme);

const ThemeProvider = ({ children, value }) => {
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
