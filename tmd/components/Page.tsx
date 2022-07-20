/**
 * Created by Widiana Putra on 01/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar } from "react-native";
import { useTheme } from "../core/theming";

interface Props {
  children: React.ReactNode;
  statusBarColor?: string;
}

export default function Page({ children, statusBarColor }: Props) {
  const { colors } = useTheme();
  return (
    <>
      <StatusBar
        backgroundColor={statusBarColor ?? colors.primary.pressed}
      />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}>
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
