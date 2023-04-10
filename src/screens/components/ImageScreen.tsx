import React, { useEffect, useRef, useState } from "react";
import { Button, Image, Page, Stack } from "../../../tmd";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";
import { Animated, Dimensions, ScrollView, View } from "react-native";

export default function ImageScreen() {
  const _images = [
    {
      id: 1,
      title: "Image 1",
      image: "https://picsum.photos/500/310",
    },
    {
      id: 2,
      title: "Image 2",
      image: "https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
    {
      id: 3,
      title: "Image 3",
      image: "https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
    {
      id: 4,
      title: "Image 4",
      image: "https://wallpaperaccess.com/full/1406840.jpg",
    },
    {
      id: 5,
      title: "Image 5",
      image: "https://images.unsplash.com/photo-1518418248320-a4de2fbc87c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&w=1000&q=80",
    },
    {
      id: 6,
      title: "Image 6",
      image: "https://cdn.wallpapersafari.com/15/4/b7xQKh.jpg",
    },
    {
      id: 7,
      title: "Image 7",
      image: "https://images.unsplash.com/photo-1533757879476-8f4a3cb1ae4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&w=1000&q=80",
    },
    {
      id: 8,
      title: "Image 8",
      image: "https://media.istockphoto.com/photos/swedish-lake-reflection-picture-id1290315780?k=20&m=1290315780&s=170667a&w=0&h=eVUsZ8d5RSOO0pHsYLIHWhT_Rj-iXiXoL_udQQECHZ8=",
    },
  ];

  const [imgs, setImgs] = useState(_images);

  // const reversedImgs = useMemo(() => {
  //   return [...imgs];
  // }, [imgs]);

  useEffect(() => {
    console.log(JSON.stringify(imgs, null, 2));
  }, [imgs]);


  return (
    <Page>
      <Toolbar title={"Image Screen"} />
      <ScrollView>
        <View style={{
          height: Dimensions.get("window").height / 2,
          width: Dimensions.get("window").width,
          position: "relative",
        }}>
          {
            imgs?.map((item, index) => {
              return <>
                <SlideableItems
                  key={item.id}
                  index={index}
                  item={item}
                  onChangeSlide={() => {
                    setImgs([...imgs.slice(1)]);
                  }} />
              </>;
            })
          }

        </View>

        <Button onPress={() => {
          setImgs([...imgs, ..._images]);
        }}>Add Image</Button>
        <View style={{ height: 32 }} />

      </ScrollView>
    </Page>
  )
    ;
}


const SlideableItems = ({
                          index,
                          item,
                          onChangeSlide,

                        }: {
  index: number,
  item: any,
  onChangeSlide: (direction: string) => void,
}) => {
  const handleChangeSlide = (direction: string) => {
    const DURATION = 500;
    setTimeout(() => {
      onChangeSlide(direction);
    }, DURATION - 50);
    Animated.timing(translateXAnimateValue, {
      toValue: direction == "left" ? -1 : 1,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
  };

  const translateXAnimateValue = useRef(new Animated.Value(0)).current;


  return <>
    <Animated.View
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 2,
        position: "absolute",
        zIndex: 10 - (index + 1),
        transform: [{
          translateX: translateXAnimateValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [-Dimensions.get("window").width, 0, Dimensions.get("window").width],
          }),
        }],
      }}>
      <Image
        style={{
          flex: 1,
        }}
        source={{ uri: item.image }} />
      <Stack
        items={"center"}
        content={"center"}
        direction={"row"}
        spacing={8}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          margin: 8,
        }}>
        <Button
          onPress={() => {
            handleChangeSlide("left");
          }}>
          Nay
        </Button>
        <Button onPress={() => {
          handleChangeSlide("right");
        }}>
          Yay
        </Button>
      </Stack>
    </Animated.View>
  </>;
};
