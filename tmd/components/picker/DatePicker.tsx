/**
 * Created by Widiana Putra on 14/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useState } from "react";
import TextField from "../TextInput/TextField";
import Icon from "../Icon";
import { default as DatePickerDialog } from "react-native-date-picker";
import moment from "moment";
import { useTheme } from "../../core/theming";
import TmdConstants from "../../utils/TmdConstants";
import { useLocale } from "../../../src/providers/LocaleProvider";

interface Props {
  date?: string;
  onDateChanges?: (date: Date) => void;
  onDateChangesFormatted?: (date: string) => void;
  title?: string;
}

export default function DatePicker({
                                     date,
                                     onDateChanges,
                                     onDateChangesFormatted,
                                     ...rest
                                   }: ComponentProps<typeof TextField> & Props) {
  const { t } = useLocale();
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  const [selected, setSelected] = useState(date ? moment(date).toDate() : null);
  const handleOpen = () => {
    setIsOpenPicker(true);
  };
  const theme = useTheme();

  return (
    <>
      <TextField
        value={
          selected ? moment(selected).format("D MMMM YYYY") : undefined
        }
        pickerType={"date"}
        editable={false}
        mode={theme?.textInput?.mode}
        onOpenPicker={handleOpen}
        {...rest}
        suffixIcon={
          <Icon source={'ionicons'} icon={"ios-calendar"} size={18} />
        }
      />

      <DatePickerDialog
        title={rest.title}
        modal={true}
        mode={"date"}
        open={isOpenPicker}
        date={selected ?? new Date()}
        confirmText={t("confirm")}
        cancelText={t("cancel")}
        androidVariant={"iosClone"}
        onConfirm={(date) => {
          setIsOpenPicker(false);
          setSelected(date);
          if (onDateChanges) {
            onDateChanges(date);
          }
          if (onDateChangesFormatted) {
            const formatted = moment(date).format(TmdConstants.DATE_FORMAT_SEND_API);
            onDateChangesFormatted(formatted);
          }
        }}
        onCancel={() => {
          setIsOpenPicker(false);
        }}
      />

    </>
  );
}
