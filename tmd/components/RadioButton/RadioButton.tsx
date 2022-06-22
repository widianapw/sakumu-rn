import * as React from "react";
import { Platform, StyleProp, TextStyle, View, ViewStyle } from "react-native";
import RadioButtonAndroid from "./RadioButtonAndroid";
import RadioButtonIOS from "./RadioButtonIOS";
import { useTheme } from "../../core/theming";
import Typography from "../Typography/Typography";

export type Props = {
  /**
   * Value of the radio button
   */
  value: string;
  /**
   * Status of radio button.
   */
  status?: "checked" | "unchecked";
  /**
   * Whether radio is disabled.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Custom color for unchecked radio.
   */
  uncheckedColor?: string;
  /**
   * Custom color for radio.
   */
  color?: string;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  testID?: string;
};

/**
 * Radio buttons allow the selection a single option from a set.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/radio-enabled.android.png" />
 *     <figcaption>Android (enabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/radio-disabled.android.png" />
 *     <figcaption>Android (disabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/radio-enabled.ios.png" />
 *     <figcaption>iOS (enabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/radio-disabled.ios.png" />
 *     <figcaption>iOS (disabled)</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { RadioButton } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [checked, setChecked] = React.useState("first");
 *
 *   return (
 *     <View>
 *       <RadioButton
 *         value="first"
 *         status={ checked === 'first' ? 'checked' : 'unchecked' }
 *         onPress={() => setChecked("first")}
 *       />
 *       <RadioButton
 *         value="second"
 *         status={ checked === 'second' ? 'checked' : 'unchecked' }
 *         onPress={() => setChecked("second")}
 *       />
 *     </View>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const RadioButton = ({ onPress, ...props }: Props) => {
  const theme = useTheme();
  const Button = Platform.select({
    default: RadioButtonAndroid,
    ios: RadioButtonIOS,
  });

  const parentComponentStyle: StyleProp<ViewStyle> = [{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }, props.containerStyle];

  const ChildrenComponent = () => {
    return <>
    </>;
  };

  return <>
    {
      <View style={parentComponentStyle}>
        <Button color={props.color ?? theme.colors.primary.main} {...props} />
        {
          props.text &&
          <Typography
            type={"body2"}
            style={[{
              color: theme.colors.neutral.neutral_90,
            },
              props.textStyle,
            ]}>
            {
              props.text
            }
          </Typography>
        }
      </View>
    }
  </>;
};

export default RadioButton;

