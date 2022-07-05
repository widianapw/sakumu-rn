/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Box, VStack } from "react-native-flex-layout";
import { Checkbox, RadioButton, Switch } from "../../../tmd";
import RadioButtonGroup from "../../../tmd/components/RadioButton/RadioButtonGroup";
import Page from "../../../tmd/components/Page";
import RNSwitch from "../../../tmd/components/Switch/RNSwitch";

export default function SelectorScreen() {
  const [isChecked, setIsChecked] = useState(true);
  const [rbVal, setRbVal] = useState("1");
  return (
    <Page>

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
          <Box mt={16} />
          <RadioButtonGroup
            onValueChange={(value => setRbVal(value))}
            value={rbVal}>
            <RadioButton value={"1"} text={"1"} />
            <RadioButton value={"2"} text={"2"} />
          </RadioButtonGroup>

          <Box mt={16} />
          <Switch onChange={() => {
            setIsChecked(!isChecked);
          }} value={isChecked} text={"Damn"} />
          <Switch value={true} disabled text={"Damn"} />
        </VStack>
      </ScrollView>
    </Page>
  );
}
