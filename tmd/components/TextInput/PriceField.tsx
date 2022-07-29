import React, { ComponentProps, useState } from "react";
import { Stack } from "../../index";
import NumberFormat from "react-number-format";
import TextField from "./TextField";

export default function PriceField({ ...rest }: ComponentProps<typeof TextField>) {
  const [textVal, setTextVal] = useState("");

  return (
    <Stack>
      <NumberFormat
        value={textVal}
        displayType={"text"}
        isNumericString={true}
        thousandSeparator
        pattern="[0-9]*"
        thousandsGroupStyle={"thousand"}
        customInput={TextField}
        renderText={(value: string) =>
          <TextField
            {...rest}
            onChangeText={(text) => {
              const newText = text.split(",").join("");
              setTextVal(newText);
            }}
            value={value} />
        }
      />
    </Stack>
  );
}
