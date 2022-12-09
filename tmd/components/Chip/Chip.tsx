/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import Typography from "../Typography/Typography";
import Icon, { IconProps } from "../Icon";
import { appTheme } from "../../core/theming";
import { TouchableRipple } from "../../index";
import PickerBottomSheet from "../BottomSheet/PickerBottomSheet";
import { PickerItem } from "../../model/PickerItem";
import { useDeepEffect } from "../../hooks/useDeepEffect";
import { ColorVariantType } from "../../types/types";
import { useSecondEffect } from "../../hooks/useSecondEffect";

export type ChipShape = "rect" | "rounded";
export type ChipVariant = "filled" | "outlined";
export type ChipType = "filter" | "picker";

export type ChipProps = {
  shape?: ChipShape;
  variant?: ChipVariant;
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProps;
  suffixIcon?: IconProps;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  colorVariant?: ColorVariantType;

  type?: ChipType;
  onPickerChanges?: (item?: PickerItem) => void;
  selectedPickerValue?: string | number | undefined;
  pickerList?: PickerItem[];
  pickerTitle?: string;
  onResetPicker?: () => void;
  saveButtonTitle?: string;
};
const ROUNDED_BORDER_RADIUS = 32;

export default function Chip({
                               shape,
                               variant,
                               text,
                               selected,
                               type = "filter",
                               suffixIcon,
                               saveButtonTitle,
                               disabled,
                               onPickerChanges,
                               selectedPickerValue,
                               colorVariant,
                               ...rest
                             }: ChipProps) {
  const { colors, chip, roundness } = appTheme();
  let bgColor, txtColor, borderColor;
  const usedVariant = variant ?? chip.variant;
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  const usedShape = shape ?? chip.shape;
  const [selectedObj, setSelectedObj] = useState<PickerItem | undefined>(undefined);
  const usedColorVariant = colorVariant ?? chip.colorVariant;
  // const isSelected = useMemo(() => {
  //   return selectedObj != undefined;
  // }, [selectedObj]);
  const [isSelected, setIsSelected] = useState(selected ?? false);
  const isFirst = useRef(true);
  const isSelectedFilled = usedVariant == "filled" && isSelected;
  const isUseBorder = usedVariant == "outlined" || isSelectedFilled;

  useDeepEffect(() => {
    setIsSelected(selected ?? false);
  }, [selected]);


  const handleReset = () => {
    setSelectedObj(undefined);
    setIsOpenPicker(false);
  };

  useEffect(() => {
    if (type == "picker") {
      if (selectedPickerValue) {
        const obj = rest?.pickerList?.find(item => item.id == selectedPickerValue);
        setSelectedObj(obj);
      } else {
        setSelectedObj(undefined);
      }
    }
  }, [selectedPickerValue]);

  useSecondEffect(() => {
    if (type == "picker") {
      setIsSelected(selectedObj != undefined);
      if (onPickerChanges) {
        onPickerChanges(selectedObj);
      }
    }
  }, [selectedObj]);

  switch (usedVariant) {
    case "filled": {
      bgColor = colors.neutral.neutral_20;
      txtColor = colors.neutral.neutral_90;
      if (isSelected) {
        bgColor = colors[usedColorVariant].main;
        txtColor = colors.neutral.neutral_10;
        borderColor = colors[usedColorVariant].border;
      }
      if (disabled) {
        bgColor = colors.neutral.neutral_30;
        borderColor = colors.neutral.neutral_50;
        txtColor = colors.neutral.neutral_50;
      }
      break;
    }
    case "outlined": {
      bgColor = colors.neutral.neutral_10;
      borderColor = colors.neutral.neutral_50;
      txtColor = colors.neutral.neutral_90;
      if (isSelected) {
        bgColor = colors[usedColorVariant].surface;
        borderColor = colors[usedColorVariant].main;
        txtColor = colors[usedColorVariant].main;
      }
      if (disabled) {
        bgColor = colors.neutral.neutral_30;
        borderColor = colors.neutral.neutral_50;
        txtColor = colors.neutral.neutral_50;
      }

      break;
    }
  }

  const borderRadius = {
    borderRadius: usedShape == "rect" ? roundness : ROUNDED_BORDER_RADIUS,
  };

  const handleOnPress = () => {
    if (type == "picker") {
      setIsOpenPicker(true);
    } else {
      if (rest.onPress) {
        rest.onPress();
      }
    }
  };

  return (
    <>
      <View
        style={[
          {
            backgroundColor: bgColor,
            borderWidth: isSelectedFilled ? 2 : isUseBorder ? 1 : 0,
            borderColor: borderColor,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "baseline",
          },
          borderRadius,
          rest.style,
        ]}>
        <TouchableRipple
          borderless
          style={[
            {
              paddingVertical: isSelectedFilled ? 4 : 6,
              paddingHorizontal: isSelectedFilled ? 14 : 16,
              flexDirection: "row",
              alignItems: "center",
            },
            borderRadius,
          ]}
          onPress={disabled ? undefined : handleOnPress}
          delayPressIn={0}>
          <>
            {rest.icon && (
              <Icon
                style={{
                  marginRight: 4,
                }}
                size={rest.icon.size ?? 18}
                color={rest.icon.color ?? txtColor}
                {...rest.icon}
              />
            )}
            <Typography
              style={[{ color: txtColor }, rest.textStyle]}
              type={"label1"}>
              {selectedObj?.name ?? text}
            </Typography>
            {suffixIcon && (
              <Icon
                style={{
                  marginLeft: 8,
                }}
                size={18}
                color={txtColor}
                {...suffixIcon}
              />
            )}

            {type == "picker" && (
              <Icon
                style={{
                  marginLeft: 4,
                }}
                size={18}
                color={txtColor}
                icon={"chevron-down"}
              />
            )}
          </>
        </TouchableRipple>
      </View>
      {
        type == "picker"
        && (
          <PickerBottomSheet
            saveButtonTitle={saveButtonTitle}
            open={isOpenPicker}
            title={rest.pickerTitle}
            onReset={
              rest.onResetPicker
                ? () => {
                  if (rest.onResetPicker) {
                    rest.onResetPicker();
                    handleReset();
                  }
                }
                : undefined
            }
            onClose={() => {
              setIsOpenPicker(false);
            }}
            onSave={item => {
              if (item?.id) {
                setSelectedObj(item);
                setIsOpenPicker(false);
              }
            }}
            value={selectedObj?.id ?? undefined}
            data={rest.pickerList}
          />
        )
      }
    </>
  );
}
