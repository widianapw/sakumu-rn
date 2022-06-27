import * as React from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import color from "color";

import TouchableRipple from "./TouchableRipple/TouchableRipple";
import { useTheme } from "../core/theming";

import type { $RemoveChildren } from "../types";
import Icon from "./Icon";
import { ButtonShape, ButtonVariant } from "./Button/Button";
import { black, white } from "../styles/colors";

type Props = $RemoveChildren<typeof TouchableRipple> & {
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Function to execute on press.
   */
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  ref?: React.RefObject<TouchableWithoutFeedback>;
  fitIcon?: boolean;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  color?: string;
  /**
   * @optional
   */
};

/**
 * An icon button is a button which displays only an icon without a label.
 * By default button has 150% size of the icon.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/icon-button-1.png" />
 *     <figcaption>Icon button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/icon-button-2.png" />
 *     <figcaption>Pressed icon button</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { IconButton, Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <IconButton
 *     icon="camera"
 *     color={Colors.red500}
 *     size={20}
 *     onPress={() => console.log("Pressed")}
 *   />
 * );
 *
 * export default MyComponent;
 * ```
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/touchable-ripple.html
 */
const IconButton = ({
                      icon,
                      color: iconColor,
                      size = 24,
                      accessibilityLabel,
                      disabled,
                      onPress,
                      style,
                      variant,
                      shape,
                      ...rest
                    }: Props & React.ComponentProps<typeof Icon>) => {
  const theme = useTheme();
  const { colors, roundness, button } = theme;

  const usedVariant = variant ?? button.variant;
  const usedShape = shape ?? button.shape;
  let backgroundColor: string,
    borderColor: string,
    textColor: string,
    borderWidth: number;

  if (usedVariant === "primary") {
    if (disabled) {
      backgroundColor = color(theme.dark ? white : black)
        .alpha(0.12)
        .rgb()
        .string();
    } else {
      backgroundColor = colors.primary?.main;
    }
  } else {
    backgroundColor = "transparent";
  }

  if (usedVariant === "secondary") {
    borderColor = colors.primary?.main;
    borderWidth = 1;
  } else {
    borderColor = "transparent";
    borderWidth = 0;
  }

  if (disabled) {
    textColor = color(colors.neutral.neutral_10)
      .alpha(0.32)
      .rgb()
      .string();
  } else if (usedVariant === "primary") {
    textColor = colors.neutral.neutral_10;
  } else {
    textColor = colors.primary.main;
  }
  const rippleColor = color(textColor).alpha(0.32).rgb().string();
  const IconComponent = Icon;
  const buttonSize = rest.fitIcon ? size : size * 1.8;
  return (
    <TouchableRipple
      borderless
      centered
      onPress={onPress}
      rippleColor={rippleColor}
      style={[
        styles.container,
        { width: buttonSize, height: buttonSize, borderRadius: shape == "rect" ? roundness : buttonSize / 2 },
        {
          backgroundColor: backgroundColor,
        },
        disabled && styles.disabled,
        style,
      ]}
      accessibilityLabel={accessibilityLabel}
      // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
      accessibilityTraits={disabled ? ["button", "disabled"] : "button"}
      accessibilityComponentType="button"
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      hitSlop={
        TouchableRipple.supported
          ? { top: 10, left: 10, bottom: 10, right: 10 }
          : { top: 6, left: 6, bottom: 6, right: 6 }
      }
      {...rest}
    >
      <View>
        <IconComponent color={iconColor ? iconColor : textColor} icon={icon} size={size} source={rest.source} />
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  disabled: {
    opacity: 0.32,
  },
});

export default IconButton;
