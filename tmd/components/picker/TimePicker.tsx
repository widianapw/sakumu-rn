/**
 * Created by Widiana Putra on 14/06/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useState } from "react";
import TextField from "../TextInput/TextField";
import Icon from "../Icon";
import DatePicker from "react-native-date-picker";
import moment from "moment";

interface Props {
  initial?: string;
  onChangeTime?: (time: string) => void;
}

export default function TimePicker({ initial, ...rest }: React.ComponentProps<typeof TextField> & Props) {
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  const [selected, setSelected] = useState(initial ? new Date() : null);
  const handleOpen = () => {
    setIsOpenPicker(true);
  };

  return (
    <>
      <TextField
        value={
          selected ?
            moment(selected).format("HH:mm") : ""
        }
        editable={false}
        pickerType={"date"}
        onOpenPicker={handleOpen}
        suffixIcon={
          <Icon icon={"time"} size={18} />
        }
        {...rest}
      />
      <DatePicker
        modal={true}
        open={isOpenPicker}
        date={selected ?? new Date()}
        mode={"time"}
        androidVariant={"iosClone"}
        onConfirm={(date) => {
          setIsOpenPicker(false);
          setSelected(date);
        }}
        onCancel={() => {
          setIsOpenPicker(false);
        }}
      />

    </>
  );
}
