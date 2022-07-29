/**
 * Created by Widiana Putra on 01/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, View } from "react-native";
import { useTheme } from "../core/theming";

interface Props {
  children: React.ReactNode;
  statusBarColor?: string;
}

export default function Page({ children, statusBarColor }: Props) {
  const { colors } = useTheme();
  const statusBarHeight = StatusBar.currentHeight



  const CStatusBar = ({ backgroundColor, ...props }: any) => (
    <View style={[{
      height: statusBarHeight
    }, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  return (
    <>
      <View style={{
        flex: 1,
      }}>

        <CStatusBar
          backgroundColor={statusBarColor ?? colors.primary.pressed}
          barStyle="light-content" 
        />
        <SafeAreaView style={{flex:1}}>
          
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}>
          {children}
        </KeyboardAvoidingView>

        </SafeAreaView>
      </View>
    </>
  );
}
