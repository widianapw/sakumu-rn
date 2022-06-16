/**
 * Created by Widiana Putra on 31/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { useTheme } from "../core/theming";
import { default as Ionicons } from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

//look icons here https://github.com/oblador/react-native-vector-icons#bundled-icon-sets
interface IconProps {
  source?: "ionicons" | "material-community" | "fa-5";
  icon: string;
  size?: number;
  color?: string;
}

const Icon = ({
                source = "ionicons", icon, size = 22, color,
              }: IconProps) => {
  const theme = useTheme();
  const defaultColor = theme.colors.neutral.neutral_80;
  return <View>
    {
      source == "material-community" &&
      <MaterialCommunityIcons name={icon} size={size} color={color ?? defaultColor} />
    }

    {
      source == "fa-5" &&
      <FontAwesome5 name={icon} size={size} color={color ?? defaultColor} />
    }

    {
      source == "ionicons" &&
      <Ionicons name={icon} size={size} color={color ?? defaultColor} />
    }
  </View>;
};

export default Icon;
