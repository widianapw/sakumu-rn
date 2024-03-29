/**
 * Created by Widiana Putra on 10/06/2022
 * Copyright (c) 2022 - Made with love
 */
import TextField, { TextInputProps } from "../TextInput/TextField";
import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import PickerBottomSheet from "../BottomSheet/PickerBottomSheet";
import { PickerItem } from "../../model/PickerItem";
import { appTheme } from "../../core/theming";
import { useDeepEffect } from "../../hooks/useDeepEffect";

interface Props {
  initial?: string | number;
  options: PickerItem[];
  onSelectedValueChange?: (value: string | number) => void;
  onSelectedItemChange?: (value?: PickerItem) => void;
}

const Select = (
  {
    initial,
    options,
    search,
    onSelectedValueChange,
    ...rest
  }:
    Props & TextInputProps & ComponentProps<typeof PickerBottomSheet>,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | number | undefined>(initial);
  const theme = appTheme();

  const selectedObj = useMemo(() => {
    return options.find((it) => it.id == selected);
  }, [selected, initial, options]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = () => {

  };

  useEffect(() => {
    if (onSelectedValueChange) {
      onSelectedValueChange(selected);
    }
  }, [selected]);

  useDeepEffect(() => {
    if (rest.onSelectedItemChange) {
      rest.onSelectedItemChange(selectedObj);
    }
  }, [selectedObj]);


  return <>
    <TextField
      label={rest.label}
      placeholder={rest.placeholder}
      onOpenPicker={() => {
        setIsOpen(true);
      }}
      value={selectedObj?.name ?? ""}
      pickerType={"select"}
      editable={false}
      mode={rest.mode ?? theme?.textInput?.mode}
      suffixIcon={{
        icon: "chevron-down",
        size: 16,
      }}
      {...rest}
    />

    <PickerBottomSheet
      value={selected}
      search={search}
      open={isOpen}
      onClose={handleClose}
      data={options}
      onSave={(value) => {
        setSelected(value?.id);
      }}
      title={rest.title ?? rest.label}
      pickerMode={rest.pickerMode ?? "select"}
    />

  </>;
};

export default Select;
