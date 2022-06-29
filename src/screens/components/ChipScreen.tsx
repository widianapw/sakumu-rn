/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */

import React from "react";
import { ScrollView } from "react-native";
import { HStack, VStack } from "react-native-flex-layout";
import Chip from "../../../tmd/components/Chip";
import _countries from "../../../tmd/data/_countries";
import { PickerItem } from "../../../tmd/model/PickerItem";

export default function ChipScreen() {
  return <ScrollView>
    <VStack p={16} spacing={8}>
      <HStack spacing={8}>
        <Chip
          text={"Widiana"}
          selected
        />
        <Chip text={"Widiana"} />
        <Chip text={"Widiana"} />
      </HStack>
      <HStack spacing={8}>
        <Chip text={"Widiana"} selected variant={"outlined"} />
        <Chip text={"Widiana"} variant={"outlined"} />
        <Chip text={"Widiana"} variant={"outlined"} />
      </HStack>

      <HStack spacing={8}>
        <Chip
          onResetPicker={()=> {}}
          variant={'outlined'}
          type={"picker"}
          pickerList={_countries.map(it => {
            const i: PickerItem = {
              id: it.code,
              name: it.name,
            };
            return i;
          })}
          initial={"ID"}
          icon={{
            icon: "camera",
          }}
          text={"Widiana"}
        />
        <Chip
          pickerList={_countries.slice(0,5).map(it => {
            const i: PickerItem = {
              id: it.code,
              name: it.name,
            };
            return i;
          })}
          type={'picker'}
          text={"Widiana"} />
        <Chip text={"Widiana"} />
      </HStack>

    </VStack>
  </ScrollView>;
}
