import * as React from "react";
import { useState } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import Typography from "./Typography/Typography";
import Icon, { IconProps } from "./Icon";
import { useTheme } from "../core/theming";
import { TouchableRipple } from "../index";
import PickerBottomSheet from "./BottomSheet/PickerBottomSheet";
import _countries from "../data/_countries";
import { PickerItem } from "../model/PickerItem";

export type ChipShape = "rect" | "rounded"
export type ChipVariant = "filled" | "outlined"
export type ChipType = "filter" | "picker"

export type ChipProps = {
  shape?: ChipShape;
  variant?: ChipVariant;
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProps;
  selected?: boolean;
  onPress?: () => void;
  type?: "filter" | "picker";
  onPickerChanges?: (item?: PickerItem) => void;
}
const ROUNDED_BORDER_RADIUS = 32;

export default function Chip({ shape, variant, text, selected, type = "filter", ...rest }: ChipProps) {
  const { colors, chip, roundness } = useTheme();
  let bgColor, txtColor, borderColor;
  const usedVariant = variant ?? chip.variant;
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  const usedShape = shape ?? chip.shape;
  const isSelectedFilled = usedVariant == "filled" && selected;
  const isUseBorder = usedVariant == "outlined" || isSelectedFilled;
  const [selectedObj, setSelectedObj] = useState({});
  switch (usedVariant) {
    case "filled": {
      bgColor = colors.neutral.neutral_20;
      txtColor = colors.neutral.neutral_90;
      if (selected) {
        bgColor = colors.primary.main;
        txtColor = colors.neutral.neutral_10;
        borderColor = colors.primary.border;
      }
      break;
    }
    case "outlined": {
      bgColor = colors.neutral.neutral_10;
      borderColor = colors.neutral.neutral_50;
      txtColor = colors.neutral.neutral_90;
      if (selected) {
        bgColor = colors.primary.surface;
        borderColor = colors.primary.main;
        txtColor = colors.primary.main;
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
    }
  };

  return <>
    <View
      style={[{
        backgroundColor: bgColor,
        borderWidth: isSelectedFilled ? 2 : isUseBorder ? 1 : 0,
        borderColor: borderColor,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "baseline",
      }, borderRadius,

        rest.style]}
    >
      <TouchableRipple
        borderless
        style={[
          {
            paddingVertical: isSelectedFilled ? 6 : 8, paddingHorizontal: isSelectedFilled ? 14 : 16,
            flexDirection: "row",
            alignItems: "center",
          },
          borderRadius,
        ]}
        onPress={handleOnPress}
        delayPressIn={0}
      >
        <>
          {
            rest.icon &&
            <Icon
              style={{
                marginRight: 4,
              }}
              size={rest.icon.size ?? 18}
              color={rest.icon.color ?? txtColor}
              {...rest.icon}
            />
          }
          <Typography
            style={[
              { color: txtColor },
              rest.textStyle,
            ]}
            type={"label1"}>
            {selectedObj?.name ?? text}
          </Typography>
          {
            type == "picker" &&
            <Icon
              style={{
                marginLeft: 4,
              }}
              size={18}
              color={txtColor}
              icon={"chevron-down"} />
          }
        </>
      </TouchableRipple>
    </View>
    <PickerBottomSheet
      open={isOpenPicker}
      onClose={() => {
        setIsOpenPicker(false);
      }}
      onSave={(item) => {
        if (rest.onPickerChanges) {
          rest.onPickerChanges(item);
        }
        setSelectedObj(item);
        setIsOpenPicker(false);
      }}
      initial={"62"}
      data={_countries.map(it => {
        const i: PickerItem = {
          name: it.name,
          id: it.code,
        };
        return i;
      })}
    />
  </>;
}
