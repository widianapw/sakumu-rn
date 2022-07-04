/**
 * Created by Widiana Putra on 04/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps } from "react";
import ImagePicker from "../picker/ImagePicker";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
}

export default function RHFImagePicker({ name, ...rest }: Props & ComponentProps<typeof ImagePicker>) {
  const { control, setValue, clearErrors } = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState }) => {
          return <ImagePicker
            error={fieldState.error != undefined}
            errorText={fieldState.error?.message}
            onChangeImage={(image) => {
              clearErrors(name);
              setValue(name, image?.path);
            }}
            {...rest}
          />;
        }}
      />
    </>
  );
}
