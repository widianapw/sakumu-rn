/**
 * Created by Widiana Putra on 01/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { useTheme } from "../core/theming";

export default function Page({ children }: any) {
  const { colors } = useTheme();
  return (
    <>
      <StatusBar
        backgroundColor={colors.primary.pressed}
      />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        {children}
      </SafeAreaView>
    </>
  );
}
