/**
 * Created by Widiana Putra on 06/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode[] | React.ReactNode;
  spacing?: number;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  style?: StyleProp<ViewStyle>;
  p?: number;
}

export default function Stack({
                                children,
                                spacing = 0,
                                direction = "column",
                                style: viewStyle,
                                p = 0,
                              }: Props) {
  const activeChildren = (children instanceof Array) ? children?.filter(it => it != undefined) : children;
  const itemCount = (activeChildren instanceof Array) ? activeChildren.length : 1;
  const isMoreThanOneItem = itemCount > 1;

  const spacingStyle = (index?: number) => {
    if (index != undefined) {
      if (index !== itemCount - 1) {
        switch (direction) {
          case "column":
            return { marginBottom: spacing };
          case "row":
            return { marginEnd: spacing };
          case "column-reverse":
            return { marginTop: spacing };
          case "row-reverse":
            return { marginStart: spacing };
        }
      }
    }
    return {};
  };

  return <View style={[{
    flexDirection: isMoreThanOneItem ? direction : "column",
    padding: p,
  }, viewStyle]}>
    {
      (activeChildren instanceof Array)
        ? <>
          {
            activeChildren.map((child, index) => {
              return <>
                {
                  child &&
                  React.cloneElement(child, {
                    key: index,
                    style: [
                      child?.props?.style,
                      spacingStyle(index),
                    ],
                  })
                }
              </>;
            })
          }
        </>
        : <View
          style={[
            spacingStyle(),
          ]}
        >
          {activeChildren}
        </View>
    }
  </View>;
}
