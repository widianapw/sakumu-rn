import { User } from "../../models/auth/Auth";
import { Theme } from "../../../tmd/types";
import { DefaultTheme } from "../../../tmd";

export type ThemeState = {
  theme?: Theme;
};

const initialState: ThemeState = {
  theme: undefined,
};

const themeReducer = (state: ThemeState = initialState, action: any) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        ...state,
        theme: action.payload.theme,
      };
    default:
      return state;
  }
};


export default themeReducer;
