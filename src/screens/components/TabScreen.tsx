import React from "react";
import { SceneMap, SceneRendererProps, TabBar, TabView } from "react-native-tab-view";
import { Animated, useWindowDimensions, View } from "react-native";
import { useTheme } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "green" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabScreen() {
  const { colors } = useTheme();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  const renderIndicator = (
    props: SceneRendererProps & {
      navigationState: any;
      getTabWidth: (i: number) => number;
    },
  ) => {
    const { position, navigationState, getTabWidth } = props;
    const inputRange = [
      0, 0.48, 0.49, 0.51, 0.52, 1, 1.48, 1.49, 1.51, 1.52, 2,
    ];

    const scale = position.interpolate({
      inputRange,
      outputRange: inputRange.map((x) => (Math.trunc(x) === x ? 2 : 0.1)),
    });

    const opacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map((x) => {
        const d = x - Math.trunc(x);
        return d === 0.49 || d === 0.51 ? 0 : 1;
      }),
    });

    const translateX = position.interpolate({
      inputRange: inputRange,
      outputRange: inputRange.map((x) => {
        const i = Math.round(x);
        return i * getTabWidth(i) * (1);
      }),
    });

    return (
      <Animated.View
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          {
            width: `${100 / navigationState.routes.length}%`,
            transform: [{ translateX }] as any,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              backgroundColor: "rgb(0, 132, 255)",
              width: 48,
              height: 48,
              borderRadius: 24,
              margin: 6,
            }
            , { opacity, transform: [{ scale }] } as any]}
        />
      </Animated.View>
    );
  };

  return (
    <>
      <TabView
        renderTabBar={(props) => <TabBar
          renderLabel={(lbl) => {
            const isSelected = lbl.focused;
            const labelColor = isSelected ? colors.primary.main : colors.neutral.neutral_70;
            return <View>
              <Typography type={"label1"} style={{ color: labelColor }}>{lbl.route.title}</Typography>
            </View>;
          }}
          labelStyle={{
            color: colors.primary.main,
          }}
          renderIndicator={(ind) => {
            return <Animated.View
              // style={{
              //   backgroundColor: colors.primary.main,
              //   height: 2,
              //   width: 10,
              // }}
              {...ind}
            >

            </Animated.View>;
          }}
          style={{
            backgroundColor: colors.neutral.neutral_10,
          }}

          // indicatorStyle={{
          //   backgroundColor: colors.primary.main,
          // }}
          {...props}
        />}
        tabBarPosition={"top"}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
}
