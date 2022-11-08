import DefaultTheme from "./DefaultTheme";
import type { Theme } from "../../types";

const DarkTheme: Theme = {
  ...DefaultTheme,
  name: "dark",
  colors: {
    ...DefaultTheme.colors,
    primary: {
      ...DefaultTheme.colors.primary,
      main: "#7677F4",
      hover: "#3334CC",
      pressed: "#21217A",
      surface: "#EFEFFF",
      border: "#DFE0F3",
      focus: "#4C4DDC33",
    },
    neutral: {
      ...DefaultTheme.colors.neutral,
      neutral_10: "#0A0A0A",
      neutral_20: "#404040",
      neutral_30: "#616161",
      neutral_40: "#757575",
      neutral_50: "#9E9E9E",
      neutral_60: "#C2C2C2",
      neutral_70: "#E0E0E0",
      neutral_80: "#EDEDED",
      neutral_90: "#F5F5F5",
      neutral_100: "#FFFFFF",
    },
  },
};

export default DarkTheme;
