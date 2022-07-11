/**
 * Created by Widiana Putra on 08/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React from "react";
import { default as ExToast, ToastOptions } from "react-native-root-toast";
import configureFonts from "../styles/fonts";
import { colors } from "../styles/colors";

export default class Toast extends ExToast {
  static show(message: string, options?: ToastOptions) {
    ExToast.show(message, {
      ...options,
      opacity: 1,
      shadow: true,
      backgroundColor: colors.neutral.neutral_90,
      textColor: colors.neutral.neutral_10,
      containerStyle: { borderRadius: 8, paddingVertical: 4, paddingHorizontal: 16 },
      textStyle: { ...configureFonts().regular, fontSize: 14 },
    });
  }
}
