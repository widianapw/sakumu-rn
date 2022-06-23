/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { VStack } from "react-native-flex-layout";
import { Checkbox } from "../../../tmd";

export default function SelectorScreen() {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <ScrollView style={{
      flex: 1,
    }}>
      <VStack p={16} style={{ flex: 1 }} spacing={16}>
        <Checkbox
          text={"Checkable"}
          checked={isChecked}
          onPress={() => {
            setIsChecked(!isChecked);
          }} />
        <Checkbox
          containerStyle={{
            marginTop: 8,
          }}
          text={"Unchecked"}
          checked={false} />
        <Checkbox
          containerStyle={{
            marginTop: 8,
          }}
          indeterminate={true} text={"Indeterminate CB"} />
      </VStack>
    </ScrollView>
  );
}
