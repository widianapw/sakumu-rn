import configureFonts from "./fonts";
import type { Theme } from "../types";
import { colors } from "./colors";

const DefaultTheme: Theme = {
  dark: false,
  roundness: 6,
  colors: colors,
  textInput: {
    mode: "filled",
    shape: "rect",
  },
  button: {
    variant: "primary",
    shape: "rounded",
    size: "md",
  },
  tag: {
    variant: "primary",
    size: "md",
    shape: "rounded",
  },
  alert:{
    variant: "info",
    type: "basic"
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DefaultTheme;
