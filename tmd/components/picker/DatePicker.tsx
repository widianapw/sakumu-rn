/**
 * Created by Widiana Putra on 14/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import TextField from "../TextInput/TextField";
import { ComponentProps } from "react";
import Icon from "../Icon";
import { default as DatePickerDialog } from "react-native-date-picker";
import moment from "moment";
import { useTheme } from "../../core/theming";

export function DatePicker({ ...rest }: ComponentProps<typeof TextField>) {
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  const [selected, setSelected] = useState(new Date());
  const handleOpen = () => {
    setIsOpenPicker(true);
  };
  const theme = useTheme();

  return (
    <>
      <TextField
        value={
          moment(selected).format("D MMMM YYYY")
        }
        pickerType={"date"}
        editable={false}
        onOpenPicker={handleOpen}
        {...rest}
        suffixIcon={
          <Icon icon={"calendar"} size={18} />
        }
      />

      <DatePickerDialog
        modal={true}
        mode={"date"}
        open={isOpenPicker}
        date={selected}
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
