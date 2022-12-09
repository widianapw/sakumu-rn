/**
 * Created by Widiana Putra on 07/12/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useCallback, useState } from "react";
import { appTheme, Page, Stack, Toolbar } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";
import { View } from "react-native";
import Slider, { SliderRangeValue } from "../../../tmd/components/Slider/Slider";
import RangeSlider from "../../../tmd/components/Slider/RangeSlider";

export default function SliderTDSScreen() {

  const [rangeValue, setRangeValue] = useState<SliderRangeValue | undefined>({
    low: 30,
    high: 40,
  });
  return <Page>
    <Toolbar title={"Slider"} />
    <Stack p={16} spacing={8}>
      <Slider
        label={"Distance"}
        initialValue={50}
        max={70}
        thumbValueFormatter={(value) => `Up to ${value}km away`}
        min={20}
        showThumbValue={true}
        thumbValuePosition={"right"}
        onValueChanged={(value) => {

        }} />

      <Slider
        isRequiredLabel={true}
        label={"Discount Price"}
        colorVariant={"danger"}
        initialValue={50}
        max={70}
        thumbType={"outlined"}
        thumbValueFormatter={(value) => `${value}%`}
        min={20}
        error={true}
        errorText={"Error message"}
        helperText={"Helper text"}
        onValueChanged={(value) => {

        }} />


      <RangeSlider
        label={"Age"}
        style={{
          marginTop: 6,
        }}

        thumbValuePosition={"bottom"}
        minRange={10}
      />
    </Stack>

  </Page>;
}
