import React, { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { Page } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";
import Tab from "../../../tmd/components/Tab/Tab";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";

interface FirstProp {
  passed: string;
}

const FirstRoute = (props: FirstProp) => (
  <View style={{ flex: 1, backgroundColor: "white" }}>
    <Typography>First {props.passed}</Typography>
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "white" }}>
    <Typography>Second</Typography>
  </View>
);

const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: "white" }}>
    <Typography>Third</Typography>
  </View>
);
const ForthRoute = () => (
  <View style={{ flex: 1, backgroundColor: "white" }}>
    <Typography>Forth</Typography>
  </View>
);


const renderScene = ({ route }) => {
  switch (route.key) {
    case "first":
      return <FirstRoute passed={"Widiana"} />;
    case "second":
      return <SecondRoute />;
    case "tird":
      return <ThirdRoute />;
    default:
      return <ForthRoute />;
  }
};

export default function TabScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "first",
      title: "On Progress",
      iconProp: {
        icon: "location",
      },
    },
    { key: "second", title: "Selesai" },
    { key: "third", title: "Third" },
    { key: "forth", title: "Forth" },
  ]);

  return (
    <>
      <Page>
        <Toolbar title={"widi"} elevation={0} />
        <Tab
          // lazy={true}
          // tabBarPosition={"bottom"}
          tabBarPosition={"top"}
          scrollable={true}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </Page>
    </>
  );
}
