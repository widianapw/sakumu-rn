import React, { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PriceField from "../TextInput/PriceField";
import { TextField } from "../../index";

interface Props {
  name: string;
}

export default function RHFPriceField({ name, ...rest }: Props & ComponentProps<typeof TextField>) {
  const { control, setValue, clearErrors } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState }) => {
          return <PriceField
            onBlur={onBlur}
            initial={value}
            error={fieldState?.error != undefined}
            errorText={fieldState?.error?.message}
            onChangePriceValue={(value) => {
              if (fieldState.error) {
                clearErrors(name);
              }
              setValue(name, value);
            }}
            {...rest}
          />;
        }}
      />
    </>
  );
}
