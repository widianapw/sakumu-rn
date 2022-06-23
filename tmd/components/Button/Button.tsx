import * as React from "react";
import { Animated, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import color from "color";

import ActivityIndicator from "../ActivityIndicator";
import Surface from "../Surface";
import TouchableRipple from "../TouchableRipple/TouchableRipple";
import { black, white } from "../../styles/colors";
import { useTheme } from "../../core/theming";
import Icon, { IconProps } from "../Icon";
import Typography, { TypographyType } from "../Typography/Typography";
import { VStack } from "react-native-flex-layout";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonShape = "rect" | "rounded"
export type ButtonSize = "sm" | "md" | "lg"

interface Props {
  /**
   * full width
   */
  fullWidth?: boolean;

  /**
   * shape
   */
  shape?: ButtonShape;

  /**
   * size
   */
  size?: ButtonSize;

  variant?: ButtonVariant;
  /**
   * Whether the color is a dark color. A dark button will render light text and vice-versa. Only applicable for `contained` mode.
   */
  dark?: boolean;
  /**
   * Use a compact look, useful for `text` buttons in a row.
   */
  compact?: boolean;
  /**
   * Custom text color for flat button, or background color for contained button.
   */
  color?: string;
  /**
   * Whether to show a loading indicator.
   */
  loading?: boolean;
  /**
   * Icon to display for the `Button`.
   */
  icon?: IconProps;
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Label text of the button.
   */
  children: React.ReactNode;
  /**
   * Make the label text uppercased. Note that this won't work if you pass React elements as children.
   */
  uppercase?: boolean;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Accessibility hint for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityHint?: string;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Function to execute on long press.
   */
  onLongPress?: () => void;
  /**
   * Style of button's inner content.
   * Use this prop to apply custom height and width and to set the icon on the right with `flexDirection: 'row-reverse'`.
   */
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style for the button text.
   */
  labelStyle?: StyleProp<TextStyle>;

  underline?: boolean;
  underlineStyle?: StyleProp<ViewStyle>;
  /**
   * testID to be used on tests.
   */
  testID?: string;
}

const Button = ({
                  size,
                  shape,
                  fullWidth = false,
                  disabled,
                  compact,
                  variant = "primary",
                  dark,
                  loading,
                  icon,
                  color: buttonColor,
                  children,
                  uppercase = false,
                  accessibilityLabel,
                  accessibilityHint,
                  onPress,
                  onLongPress,
                  style,
                  contentStyle,
                  labelStyle,
                  testID,
                  accessible,
                  ...rest
                }: Props & React.ComponentProps<typeof Surface>) => {
  const theme = useTheme();
  const usedShape = shape ?? theme.button.shape;
  let marginSize = 8;

  const usedSize = size ?? theme.button.size;
  switch (usedSize) {
    case "sm":
      marginSize = 8;
      break;
    case "md":
      marginSize = 10;
      break;
    case "lg":
      marginSize = 12;
      break;
  }


  const { current: elevation } = React.useRef<Animated.Value>(
    new Animated.Value(disabled || variant !== "primary" ? 0 : 2),
  );
  React.useEffect(() => {
    elevation.setValue(disabled || variant !== "primary" ? 0 : 2);
  }, [variant, elevation, disabled]);

  const handlePressIn = () => {
    if (variant === "primary") {
      const { scale } = theme.animation;
      Animated.timing(elevation, {
        toValue: 8,
        duration: 200 * scale,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (variant === "primary") {
      const { scale } = theme.animation;
      Animated.timing(elevation, {
        toValue: 2,
        duration: 150 * scale,
        useNativeDriver: true,
      }).start();
    }
  };

  const { colors, roundness } = theme;

  let backgroundColor: string,
    borderColor: string,
    textColor: string,
    borderWidth: number;

  if (variant === "primary") {
    if (disabled) {
      backgroundColor = color(theme.dark ? white : black)
        .alpha(0.12)
        .rgb()
        .string();
    } else if (buttonColor) {
      backgroundColor = buttonColor;
    } else {
      backgroundColor = colors.primary?.main;
    }
  } else {
    backgroundColor = "transparent";
  }

  if (variant === "secondary") {
    borderColor = colors.primary?.main;
    borderWidth = 1;
  } else {
    borderColor = "transparent";
    borderWidth = 0;
  }

  if (disabled) {
    textColor = color(theme.dark ? white : black)
      .alpha(0.32)
      .rgb()
      .string();
  } else if (variant === "primary") {
    let isDark;

    if (typeof dark === "boolean") {
      isDark = dark;
    } else {
      isDark =
        backgroundColor === "transparent"
          ? false
          : !color(backgroundColor).isLight();
    }

    textColor = isDark ? white : black;
  } else if (buttonColor) {
    textColor = buttonColor;
  } else {
    textColor = colors.primary.main;
  }

  const rippleColor = color(colors.primary.pressed).alpha(0.32).rgb().string();
  const buttonStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius: usedShape == "rect"
      ? roundness
      : 32,
  };
  const touchableStyle = {
      borderRadius: usedShape == "rect"
        ? style
          ? ((StyleSheet.flatten(style) || {}) as ViewStyle).borderRadius ||
          roundness
          : roundness
        : 32,
    }
  ;

  const { color: customLabelColor, fontSize: customLabelSize } =
  StyleSheet.flatten(labelStyle) || {};

  const textStyle = { color: textColor };
  const isIconButton = !children && icon;
  const iconStyle = isIconButton
    ? { ...styles.iconButton, margin: marginSize }
    : StyleSheet.flatten(contentStyle)?.flexDirection === "row-reverse"
      ? styles.iconReverse
      : styles.icon;
  let buttonType: TypographyType;
  switch (size) {
    case "sm" : {
      buttonType = "button3";
      break;
    }
    case "md": {
      buttonType = "button2";
      break;
    }
    case "lg": {
      buttonType = "button1";
      break;
    }
  }
  return (

    <View style={
      [
        { display: "flex", flexDirection: fullWidth ? "column" : "row" },
        fullWidth ? {
          flex: 1,
        } : {},
        rest.containerStyle,
      ]
    }>
      <Surface
        {...rest}
        style={[
          styles.button,
          compact && styles.compact,
          { elevation },
          buttonStyle,
          style,
        ]}
      >
        <TouchableRipple
          borderless
          delayPressIn={0}
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
          accessibilityTraits={disabled ? ["button", "disabled"] : "button"}
          accessibilityComponentType="button"
          accessibilityRole="button"
          accessibilityState={{ disabled }}
          accessible={accessible}
          disabled={disabled}
          rippleColor={rippleColor}
          style={touchableStyle}
          testID={testID}
        >
          <VStack>

            <View style={[
              { marginVertical: marginSize },
              styles.content,
              contentStyle,
            ]}>
              {icon && loading !== true ? (
                <View style={[
                  iconStyle,
                ]}>
                  <Icon
                    icon={icon.icon}
                    source={icon.source}
                    size={icon.size ?? customLabelSize ?? 20}
                    color={
                      icon.color ??
                      typeof customLabelColor === "string"
                        ? customLabelColor
                        : textColor
                    }
                  />
                </View>
              ) : null}
              {loading ? (
                <ActivityIndicator
                  size={customLabelSize ?? 16}
                  color={
                    typeof customLabelColor === "string"
                      ? customLabelColor
                      : textColor
                  }
                  style={[
                    iconStyle,
                  ]}
                />
              ) : null}
              {
                !isIconButton &&
                <Typography
                  type={buttonType}
                  selectable={false}
                  numberOfLines={1}
                  style={[
                    styles.label,
                    uppercase && styles.uppercaseLabel,
                    textStyle,
                    labelStyle,
                    {},
                  ]}
                >
                  {children}
                </Typography>
              }
            </View>

            {rest?.underline &&
              <View
                style={[{
                  height: 1,
                  marginBottom: 2,
                  marginHorizontal: 2,
                  backgroundColor: textColor ?? colors.primary.main,
                },
                  rest.underlineStyle,
                ]
                }
              />
            }
          </VStack>
        </TouchableRipple>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderStyle: "solid",
  },
  compact: {
    minWidth: "auto",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  icon: {
    marginRight: 4,
    // marginLeft: 12,
    // marginRight: -10,
  },
  iconReverse: {
    // marginRight: 12,
    // marginLeft: -10,
    marginLeft: 4,
  },
  iconButton: {
    margin: 8,
  },
  label: {
    textAlign: "center",
    letterSpacing: 1,
  },
  compactLabel: {
    marginHorizontal: 8,
  },
  uppercaseLabel: {
    textTransform: "uppercase",
  },
});

// export const ButtonComponent = Button;
export default Button;
