import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, Pressable, View, ViewToken } from "react-native";
import Typography from "../Typography/Typography";
import { ImageRatioType } from "../../types";
import { useTheme } from "../../core/theming";
import { IconButton } from "../../index";
import ImageViewerModal from "../Modal/ImageViewerModal";
import { TapGestureHandler } from "react-native-gesture-handler";

interface Props {
  images: string[];
  ratio?: ImageRatioType;
}

export default function ImageSlider({ images, ratio = "16:9" }: Props) {
  const ref = useRef<FlatList>(null);

  const width = Dimensions.get("screen").width;

  const usedRatio = ratio.split(":");

  const height = ((width / parseInt(usedRatio[0])) * parseInt(usedRatio[1]));
  const [currIndex, setCurrIndex] = useState(0);

  const indicatorSize = 8;

  const { colors } = useTheme();
  const renderIndicator = ({ item, index }) => {
    const isCurr = currIndex === index;
    return <Pressable
      onPress={() => {
        handleChangePosition(index);
      }}
      style={{
        height: indicatorSize,
        width: indicatorSize,
        borderRadius: indicatorSize / 2,
        marginHorizontal: 2,
        backgroundColor: isCurr ? colors.neutral.neutral_10 : colors.neutral.neutral_60,
      }}>
    </Pressable>;
  };

  const handleChangePosition = (index: number) => {
    setCurrIndex(index);
    ref?.current?.scrollToIndex({
      index: index,
      animated: true,
    });

  };

  const onViewRef = React.useRef((info: { viewableItems: ViewToken[] }) => {
    if (info.viewableItems.length) {
      setCurrIndex(info.viewableItems[0]?.index);
    }
    // Use viewable items in state or as intended
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 100 });


  const indRef = useRef<FlatList>(null);
  useEffect(() => {
    if (currIndex != null) {
      indRef?.current?.scrollToIndex({
        index: currIndex,
        animated: true,
      });
    }
  }, [currIndex]);

  const [isOpenViewer, setIsOpenViewer] = useState(false);

  return (
    <>
      <ImageViewerModal
        index={currIndex}
        onClose={() => {
          setIsOpenViewer(false);
        }} open={isOpenViewer} images={images} />
      <View style={{
        position: "relative",
      }}>
        <FlatList
          ref={ref}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          horizontal={true}
          data={images}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          style={{
            width: Dimensions.get("screen").width,
            height: height,
          }}
          renderItem={({ item }) => {
            return <Pressable
              onPress={() => {
                setIsOpenViewer(true);
              }}
              style={{ flex: 1 }}>
              <Image source={{ uri: item }} style={{
                height: height,
                width: Dimensions.get("screen").width,
              }} />
            </Pressable>;
          }} />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            start: 0,
            margin: 16,
            width: width / 5,
          }}
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            ref={indRef}
            horizontal={true}
            data={images}
            renderItem={renderIndicator} />
        </View>

        <View style={{
          position: "absolute",
          end: 0,
          bottom: 0,
          margin: 16,
        }}>
          <IconButton
            onPress={() => {
              setIsOpenViewer(true);
            }}
            fitIcon
            style={{
              backgroundColor: "transparent",
            }}
            shape={"rect"}
            size={24}
            icon={"apps"} />
        </View>
      </View>
    </>
  );
}
