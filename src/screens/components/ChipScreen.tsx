/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView } from "react-native";
import { HStack, VStack } from "react-native-flex-layout";
import Chip from "../../../tmd/components/Chip";

export default function ChipScreen() {
  return <ScrollView>
    <VStack p={16} spacing={8}>
      <HStack spacing={8}>
        <Chip icon={{
          icon: "camera",
        }} text={"Widiana"} selected type={'picker'} />
        <Chip text={"Widiana"} />
        <Chip text={"Widiana"} />
      </HStack>
      <HStack spacing={8}>
        <Chip text={"Widiana"} selected variant={"outlined"} />
        <Chip text={"Widiana"} variant={"outlined"} />
        <Chip text={"Widiana"} variant={"outlined"} />
      </HStack>

    </VStack>
  </ScrollView>;
}
