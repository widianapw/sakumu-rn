import * as React from "react";
import { View } from "react-native";
import { useTheme } from "../core/theming";

interface Props {
  variant?: "solid" | "dotted";
}

export default function Divider({ variant, ...props }: Props & React.ComponentProps<typeof View>) {
  const theme = useTheme();
  return <View
    style={[{
      borderStyle: variant == "dotted" ? "dotted" : "solid",
      borderWidth: 0.5,
      borderRadius: 1,
      borderColor: theme.colors.neutral.neutral_40,
    },
      props.style,
    ]}
  >
  </View>;
}
