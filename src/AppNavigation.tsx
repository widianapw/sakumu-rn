/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import ButtonScreen from "./screens/components/ButtonScreen";
import TypographyScreen from "./screens/components/TypographyScreen";
import MainScreen from "./screens/MainScreen";
import TextFieldScreen from "./screens/components/TextFieldScreen";
import PickerScreen from "./screens/components/PickerScreen";
import BottomSheetScreen from "./screens/components/BottomSheetScreen";
import LanguageScreen from "./screens/components/LanguageScreen";
import TagScreen from "./screens/components/TagScreen";
import AlertScreen from "./screens/components/AlertScreen";
import SelectorScreen from "./screens/components/SelectorScreen";

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  const NavTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };
  return (
    <NavigationContainer theme={NavTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,

        }}


      >
        <Stack.Screen name={"MainScreen"} component={MainScreen} />
        <Stack.Screen name={"ButtonScreen"} component={ButtonScreen} />
        <Stack.Screen name={"TypographyScreen"} component={TypographyScreen} />
        <Stack.Screen name={"TextFieldScreen"} component={TextFieldScreen} />
        <Stack.Screen name={"PickerScreen"} component={PickerScreen} />
        <Stack.Screen name={"BottomSheetScreen"} component={BottomSheetScreen} />
        <Stack.Screen name={"TagScreen"} component={TagScreen} />
        <Stack.Screen name={"AlertScreen"} component={AlertScreen} />
        <Stack.Screen name={"SelectorScreen"} component={SelectorScreen} />
        <Stack.Screen name={"LanguageScreen"} component={LanguageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
