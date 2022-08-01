import React, { ComponentProps, useEffect, useState } from "react";
import { Stack } from "../../index";
import NumberFormat from "react-number-format";
import TextField from "./TextField";

interface Props {
  initial?: string;
  onChangePriceValue?: (value?: string) => void;
}

export default function PriceField({ initial, onChangePriceValue, ...rest }: ComponentProps<typeof TextField> & Props) {

  const [textVal, setTextVal] = useState(initial);
  useEffect(() => {
    if (onChangePriceValue) {
      onChangePriceValue(textVal);
    }
  }, [textVal]);

  useEffect(() => {
    if (initial) {
      setTextVal(initial);
    }
  }, []);


  console.log("rendered PriceField");

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
            onChangeText={(text) => {
              const newText = text.split(",").join("");
              setTextVal(newText);
            }}
            value={value}
            {...rest}
          />
        }
      />
    </Stack>
  );
}
