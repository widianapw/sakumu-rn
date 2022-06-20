/**
 * Created by Widiana Putra on 30/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useState } from "react";
import TextField from "../TextInput/TextField";
import _countries from "../../data/_countries";
import PickerBottomSheet from "../BottomSheet/PickerBottomSheet";
import { PickerItem } from "../../model/PickerItem";

interface Props {
  initialPhoneCode?: string;
  onPhoneCodeChange?: (code: string) => void;
}

const PhoneField = ({
                      search,
                      onPhoneCodeChange,
                      ...props
                    }: Props & React.ComponentProps<typeof TextField> & React.ComponentProps<typeof PickerBottomSheet>) => {
  const [selected, setSelected] = useState(props.initialPhoneCode ?? "62");
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  const handleOpenPicker = () => {
    setIsOpenPicker(true);
  };

  useEffect(() => {
    if (onPhoneCodeChange) {
      onPhoneCodeChange(selected);
    }
    return () =>{};
  }, [selected]);



  return <>
    <TextField
      pickerType={"phone"}
      onOpenPicker={() => {
        handleOpenPicker();
      }}
      initialPhoneCode={selected}
      keyboardType={"numeric"}
      {...props}
    />


    <PickerBottomSheet
      initial={selected}
      open={isOpenPicker}
      search={search}
      onClose={() => {
        setIsOpenPicker(false);
      }}
      data={
        _countries.map((item) => {
          const i: PickerItem = {
            id: item.phone_code,
            name: `+${item.phone_code} (${item.name})`,
            image: item.flag,
          };
          return i;
        })
      }
      onSave={(value) => {
        setSelected(value);
        setIsOpenPicker(false);
      }}
      title={"Phone Code Picker"}
    />
  </>;
};

export default PhoneField;
