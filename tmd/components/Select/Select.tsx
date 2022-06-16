/**
 * Created by Widiana Putra on 10/06/2022
 * Copyright (c) 2022 - Made with love
 */
import TextField, { TextInputProps } from "../TextInput/TextField";
import Icon from "../Icon";
import React, { ComponentProps, useMemo, useState } from "react";
import PickerBottomSheet from "../BottomSheet/PickerBottomSheet";
import { PickerItem } from "../../model/PickerItem";
import { useTheme } from "../../core/theming";

interface Props {
  initial?: string | number;
  options: PickerItem[];
}

const Select = ({
                  initial,
                  options,
                  search,
                  ...rest
                }: Props & TextInputProps & ComponentProps<typeof PickerBottomSheet>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initial);
  const theme = useTheme();

  const selectedObj = useMemo(() => {
    return options.find((it) => it.id == selected);
  }, [selected]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = () => {

  };

  return <>
    <TextField
      label={rest.label}
      placeholder={rest.placeholder}
      onOpenPicker={() => {
        setIsOpen(true);
      }}
      value={selectedObj?.name}
      pickerType={"select"}
      editable={false}
      mode={rest.mode ?? theme?.textInput?.mode}
      suffixIcon={
        <Icon
          icon={"chevron-down"}
          size={16} />
      }
      {...rest}
    />

    <PickerBottomSheet
      initial={selected}
      search={search}
      open={isOpen}
      onClose={handleClose}
      data={options}
      onSave={(value) => {
        setSelected(value);
        handleClose();
      }}
      title={rest.title ?? rest.label} />
  </>;
};

export default Select;
