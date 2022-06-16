import * as React from "react";
import { Animated, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import color from "color";

import ActivityIndicator from "../ActivityIndicator";
import { IconSource } from "../MaterialIcon";
import Surface from "../Surface";
import Text from "../Typography/Text";
import TouchableRipple from "../TouchableRipple/TouchableRipple";
import { black, white } from "../../styles/colors";
import { useTheme } from "../../core/theming";
import Icon from "../Icon";
import Typography from "../Typography/Typography";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonShape = "rect" | "rounded"
type ButtonSize = "sm" | "md" | "lg"

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
  icon?: IconSource;
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
  /**
   * Style for the button text.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * testID to be used on tests.
   */
  testID?: string;
}

const Button = ({
                  size = "md",
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
  switch (size) {
    case "sm":
      marginSize = 6;
      break;
    case "md":
      marginSize = 8;
      break;
    case "lg":
      marginSize = 12;
      break;
  }

  if (variant == "tertiary") {
    marginSize = 0;
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

  const font = theme.fonts.medium;
  const textStyle = { color: textColor, ...font };
  const isIconButton = !children && icon;
  const iconStyle = isIconButton
    ? { ...styles.iconButton, margin: marginSize }
    : StyleSheet.flatten(contentStyle)?.flexDirection === "row-reverse"
      ? styles.iconReverse
      : styles.icon;

  return (
    <View style={{ display: "flex", flexDirection: fullWidth ? "column" : "row" }}>
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
          <View style={[styles.content, contentStyle]}>
            {icon && loading !== true ? (
              <View style={[
                variant == "tertiary" ? {} : iconStyle,
              ]}>
                <Icon
                  icon={icon}
                  size={customLabelSize ?? 16}
                  color={
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
                  variant == "tertiary" ? {} : iconStyle,
                ]}
              />
            ) : null}
            {
              !isIconButton &&
              <Typography
                selectable={false}
                numberOfLines={1}
                style={[
                  styles.label,

                  compact && styles.compactLabel,
                  uppercase && styles.uppercaseLabel,
                  textStyle,
                  font,
                  labelStyle,
                  {
                    marginVertical: marginSize,
                  },
                  variant == "tertiary" ? { marginHorizontal: 0 } : {},
                ]}
              >
                {children}
              </Typography>
            }
          </View>
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
  },
  icon: {
    marginLeft: 12,
    marginRight: -10,
  },
  iconReverse: {
    marginRight: 12,
    marginLeft: -10,
  },
  iconButton: {
    margin: 8,
  },
  label: {
    textAlign: "center",
    letterSpacing: 1,
    marginVertical: 8,
    marginHorizontal: 16,
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
