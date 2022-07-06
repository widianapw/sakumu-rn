/**
 * Created by Widiana Putra on 06/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React from "react";
import { View } from "react-native";
interface Props {
  cols?: number;
  children?: React.ReactNode[];
}
export default function Grid({children}: Props){
  return (
    <View>
      {children}
    </View>
  )
}
