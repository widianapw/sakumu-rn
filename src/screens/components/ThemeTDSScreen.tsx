import React from "react";
import { Button, Page, Stack, Toolbar } from "../../../tmd";
import { useTheme } from "../../../tmd/providers/ThemeProvider";
import { AppThemes } from "../../../tmd/styles/theme/AppThemes";

export default function ThemeTDSScreen() {
  const { changeTheme } = useTheme();
  return <Page>
    <Toolbar title={"Change Theme"} />
    <Stack p={16} spacing={16}>
      {
        AppThemes.map((theme, index) => {
          return <Button
            buttonStyle={{ width: "100%" }}
            labelStyle={{
              textTransform: "capitalize",
            }}
            onPress={() => {
              changeTheme(theme);
            }}>
            {theme.name}
          </Button>;
        })
      }
    </Stack>
  </Page>;
}
