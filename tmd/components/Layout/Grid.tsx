/**
 * Created by Widiana Putra on 06/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface Props {
  cols?: number;
  spacing?: number;
  children: React.ReactNode[] | React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Grid({ children, cols = 1, spacing = 0, style: viewStyle }: Props) {
  const [parentWidth, setParentWidth] = useState(0);
  const activeChildren = (children instanceof Array) ? children?.filter(it => it != undefined) : children;
  const itemCount = (activeChildren instanceof Array) ? activeChildren.length : 1;

  const allArray = Array.from(Array(itemCount).keys());
  const chunkedArray = chunk(allArray, cols);

  function chunk(array: any[], chunk: number) {
    let result = [];
    for (let i = 0; i < array.length; i += chunk) {
      result.push(array.slice(i, i + chunk));
    }
    return result;
  }


  const marginStyle = (index?: number) => {
    if (index != undefined) {
      const styles: ViewStyle = {
        marginRight: spacing,
        marginBottom: spacing,
      };
      const isRightEdge = ((index + 1) % cols == 0);
      const isBottomEdge = [...chunkedArray[chunkedArray.length - 1]].includes(index);
      if (isRightEdge) {
        styles.marginRight = 0;
      }
      if (isBottomEdge) {
        styles.marginBottom = 0;
      }
      console.log(styles);
      return styles;
    }
    return {};
  };

  return (
    <View

      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
      }}
      style={[
        {
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
        },
        viewStyle,
      ]}>
      {
        (activeChildren instanceof Array)
          ? <>
            {
              activeChildren.map((child, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      child?.props?.style,
                      marginStyle(index),
                      {
                        width: ((parentWidth - (spacing * (cols - 1))) / cols),
                      }]}>
                    {
                      child
                    }
                  </View>
                );
              })
            }
          </>
          : <View style={[marginStyle()]}>
            {children}
          </View>
      }

    </View>
  );
}
