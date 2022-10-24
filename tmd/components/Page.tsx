/**
 * Created by Widiana Putra on 01/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, View } from "react-native";
import { useTheme } from "../core/theming";
import Color from "color";

interface Props {
  children: React.ReactNode;
  statusBarColor?: string;
  bgColor?: string;
}

export default function Page({ children, statusBarColor, bgColor }: Props) {
  const { colors } = useTheme();
  const statusBarHeight = StatusBar.currentHeight;
  const statusBarBackgroundColor = statusBarColor ?? colors.primary.pressed;
  const isLight = Color(statusBarBackgroundColor).isLight();


  const CStatusBar = ({ backgroundColor, ...props }: any) => (
    <>{
      <StatusBar backgroundColor={backgroundColor}
                 barStyle={isLight ? "dark-content" : "light-content"} {...props} />
    }
    </>
  );

  return (
    <>
      <CStatusBar
        backgroundColor={statusBarColor ?? colors.primary.pressed}
      />

      <SafeAreaView style={[
        { flex: 1 },
        bgColor ? { backgroundColor: bgColor } : {},
      ]}>

        {
          Platform.OS === "ios" ?
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}>
              {children}
            </KeyboardAvoidingView>
            : <>
              {children}
            </>
        }

      </SafeAreaView>
    </>
  );
}
