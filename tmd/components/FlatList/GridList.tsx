import React, { ComponentProps, useState } from "react";
import { FlatList, View, ViewStyle } from "react-native";

interface Props {
  cols: number;
  spacing?: number;
  padding?: number;
}

export default function GridList({
                                   cols,
                                   renderItem,
                                   spacing = 0,
                                   padding = 0,
                                   ...rest
                                 }: Props & ComponentProps<typeof FlatList>) {
  const dataLength = rest.data?.length ?? 0;
  const allArray = Array.from(Array(dataLength).keys());
  const chunkedArray = chunk(allArray, cols);
  const [listWidth, setListWidth] = useState(0);

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
      return styles;
    }
    return {};
  };

  // const padding = (rest.contentContainerStyle?.padding ?? 0) * 2;


  const RenderItemWrapper = ({ children, index }: any) => {
    return <View style={[
      listWidth ?
        {
          width: (((listWidth - (spacing * (cols - 1))) / cols) - (padding * 2 / cols)),
        } : { flex: 1 }, marginStyle(index)]}>
      {children}
    </View>;
  };
  return (
    <>
      <FlatList
        onLayout={(event) => {
          setListWidth(event.nativeEvent.layout.width);
        }}
        numColumns={cols}
        renderItem={({ item, index }) => {
          return <>
            <RenderItemWrapper index={index}>
              {
                renderItem &&
                <>
                  {
                    renderItem({ item, index })
                  }
                </>
              }
            </RenderItemWrapper>
          </>;
        }}
        contentContainerStyle={[
          rest?.contentContainerStyle,
          {
            padding: padding,
          }]}
        {...rest} />
    </>
  );
}
