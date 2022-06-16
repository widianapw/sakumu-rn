/**
 * Created by Widiana Putra on 30/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "../../../tmd";
import PhoneField from "../../../tmd/components/picker/PhoneField";
import _countries from "../../../tmd/data/_countries";
import { VStack } from "react-native-flex-layout";
import Select from "../../../tmd/components/Select/Select";
import { PickerItem } from "../../../tmd/model/PickerItem";
import { DatePicker } from "../../../tmd/components/picker/DatePicker";
import TimePicker from "../../../tmd/components/picker/TimePicker";
import MapPicker from "../../../tmd/components/picker/MapPicker";

export default function PickerScreen() {
  const theme = useTheme();
  const [selected, setSelected] = useState("62");
  const [date, setDate] = useState(new Date());
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  return <ScrollView style={{
    flex: 1,
    backgroundColor: "white",
  }}>
    <VStack
      spacing={16}
      style={{
        padding: 16,
      }}>

      <MapPicker
        label={"Map Picker"}
        placeholder={"Map Picker"}
      />

      <DatePicker
        label={"Date Picker"}
        placeholder={"Pick date"}
      />

      <TimePicker
        label={"Time Picker"}
        placeholder={"Time Picker"}
      />

      <PhoneField
        search={true}
        selectedPhoneCode={"62"}
        placeholder={"Phone"}
        label={"Phone"}
        mode={"contained"} />

      <PhoneField
        search={true}
        selectedPhoneCode={"62"}
        placeholder={"Phone"}
        label={"Phone"}
        mode={"filled"} />

      <PhoneField
        error
        errorText={"Must filled"}
        search={true}
        selectedPhoneCode={"62"}
        placeholder={"Phone"}
        label={"Phone"}
        mode={"flat"} />

      <Select
        label={"Country"}
        search={true}
        initial={"62"}
        options={
          _countries.map((item) => {
            const i: PickerItem = {
              id: item.phone_code,
              name: `+${item.phone_code} (${item.name})`,
            };
            return i;
          })
        }
      />

      <Select
        label={"Country"}
        mode={"filled"}
        search={true}
        initial={"62"}
        options={
          _countries.map((item) => {
            const i: PickerItem = {
              id: item.phone_code,
              name: `+${item.phone_code} (${item.name})`,
            };
            return i;
          })
        }
      />

      <Select
        mode={"flat"}
        label={"Country"}
        search={true}
        initial={"62"}
        options={
          _countries.map((item) => {
            const i: PickerItem = {
              id: item.phone_code,
              name: `+${item.phone_code} (${item.name})`,
            };
            return i;
          })
        }
      />


    </VStack>

  </ScrollView>;
}
