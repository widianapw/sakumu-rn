/**
 * Created by Widiana Putra on 14/11/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useEffect, useState } from "react";
import { appTheme, Icon } from "../../../tmd";
import { Animated, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigationType } from "../../navigations/AppNavigationType";
import Typography from "../../../tmd/components/Typography/Typography";
import ButtonScreen from "./ButtonScreen";
import AlertScreen from "./AlertScreen";
import TagScreen from "./TagScreen";
import ImageScreen from "./ImageScreen";
import BottomNavbar from "../../../tmd/components/BottomNav/BottomNavbar";

const Tab = createBottomTabNavigator<BottomTabNavigationType>();


export default function BottomNavTDSScreen() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNavbar {...props} variant={"highlight"} />}
      screenOptions={{
        headerShown: false,
      }}>

      <Tab.Screen
        options={{
          tabBarLabel: "Button",
          icon: "home",
          inactiveIcon: "home-outline",
        }}
        name="ButtonScreen" component={ButtonScreen} />

      <Tab.Screen
        options={{
          tabBarLabel: "Alert",
          icon: "warning",
        }}
        name="AlertScreen" component={AlertScreen} />

      <Tab.Screen
        options={{
          tabBarLabel: "Tag",
          icon: "water",
        }}
        name="TagScreen" component={TagScreen} />

      <Tab.Screen
        options={{
          tabBarLabel: "Image",
          icon: "image",
        }}
        name={"ImageScreen"} component={ImageScreen} />
    </Tab.Navigator>
  );

}
