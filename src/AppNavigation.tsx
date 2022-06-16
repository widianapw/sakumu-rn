/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ButtonScreen from "./screens/components/ButtonScreen";
import TypographyScreen from "./screens/components/TypographyScreen";
import MainScreen from "./screens/MainScreen";
import TextFieldScreen from "./screens/components/TextFieldScreen";
import PickerScreen from "./screens/components/PickerScreen";
import { Host, Portal } from "react-native-portalize";

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Host>
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
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
};

export default AppNavigation;
