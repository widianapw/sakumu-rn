/**
 * Created by Widiana Putra on 21/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import Typography from "../../../tmd/components/Typography/Typography";
import { ScrollView } from "react-native";
import { VStack } from "react-native-flex-layout";
import { Button } from "../../../tmd";
import { useLocale } from "../../providers/LocaleProvider";

export default function LanguageScreen() {
  const { changeLanguage, t, currentLanguage } = useLocale();
  return (
    <ScrollView>
      <VStack spacing={16} p={16} items={"center"} justify={"center"}>
        <Typography>{t("welcome_to_rnstarterkit")}</Typography>
        <Typography>current lang: {currentLanguage}</Typography>
        <VStack spacing={8}>
          <Button
            onPress={() => {
              changeLanguage("en");
            }}
          >Change to English</Button>
          <Button
            onPress={() => {
              changeLanguage("id");
            }}
          >Change to Indonesia</Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
