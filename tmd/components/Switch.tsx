import * as React from "react";
import { black, grey400, grey50, grey800 } from "../styles/colors";
import { NativeModules, Platform, StyleProp, Switch as NativeSwitch, TextStyle, View, ViewStyle } from "react-native";
import setColor from "color";
import { useTheme } from "../core/theming";
import Typography from "./Typography/Typography";

const version = NativeModules.PlatformConstants
  ? NativeModules.PlatformConstants.reactNativeVersion
  : undefined;

type Props = React.ComponentPropsWithRef<typeof NativeSwitch> & {
  /**
   * Disable toggling the switch.
   */
  disabled?: boolean;
  /**
   * Value of the switch, true means 'on', false means 'off'.
   */
  value?: boolean;
  /**
   * Custom color for switch.
   */
  color?: string;
  /**
   * Callback called with the new value when it changes.
   */
  onValueChange?: Function;
  style?: StyleProp<ViewStyle>;
  switchStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  /**
   * @optional
   */
};

/**
 * Switch is a visual toggle between two mutually exclusive states — on and off.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/switch-enabled.android.png" />
 *     <figcaption>Android (enabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/switch-disabled.android.png" />
 *     <figcaption>Android (disabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/switch-enabled.ios.png" />
 *     <figcaption>iOS (enabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/switch-disabled.ios.png" />
 *     <figcaption>iOS (disabled)</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Switch } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [isSwitchOn, setIsSwitchOn] = React.useState(false);
 *
 *   const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
 *
 *   return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
 * };
 *
 * export default MyComponent;
 * ```
 */
const Switch = ({
                  value,
                  disabled,
                  onValueChange,
                  color,
                  switchStyle,
                  textStyle,
                  style,
                  text,
                  ...rest
                }: Props) => {
  const theme = useTheme();
  const checkedColor = color || theme.colors.primary.main;

  const onTintColor =
    Platform.OS === "ios"
      ? checkedColor
      : disabled
        ? setColor(black).alpha(0.12).rgb().string()
        : setColor(checkedColor).alpha(0.5).rgb().string();

  const thumbTintColor =
    Platform.OS === "ios"
      ? undefined
      : disabled
      ? theme.dark
        ? grey800
        : grey400
      : value
      ? checkedColor
      : theme.dark
      ? grey400
      : grey50;

  const props =
    version && version.major === 0 && version.minor <= 56
      ? {
          onTintColor,
          thumbTintColor,
        }
      : Platform.OS === 'web'
      ? {
          activeTrackColor: onTintColor,
          thumbColor: thumbTintColor,
          activeThumbColor: checkedColor,
        }
      : {
          thumbColor: thumbTintColor,
          trackColor: {
            true: onTintColor,
            false: '',
          },
        };

  return (
    <View style={
      [
        {
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
        },
        style,
      ]
    }>
      <View>
        <NativeSwitch
          value={value}
          disabled={disabled}
          onValueChange={disabled ? undefined : onValueChange}
          style={switchStyle}
          {...props}
          {...rest}
        />
      </View>
      {text &&
        <Typography
          style={textStyle}
          type={"body2"}>
          {text}
        </Typography>
      }
    </View>
  );
};

export default Switch;
