/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView, View } from "react-native";
import Typography from "../../../tmd/components/Typography/Typography";

export default function TypographyScreen() {
  return <ScrollView>
    <View
      style={{ padding: 16, flexDirection: "column" }}
    >
      <Typography type={"h1"}>Heading 1</Typography>
      <Typography type={"h2"}>Heading 2</Typography>
      <Typography type={"h3"}>Heading 3</Typography>
      <Typography type={"title1"}>Title 1</Typography>
      <Typography type={"title2"}>Title 2</Typography>
      <Typography type={"title3"}>Title 3</Typography>
      <Typography type={"label1"}>Label 1</Typography>
      <Typography type={"label2"}>Label 2</Typography>
      <Typography type={"body1"}>Body 1</Typography>
      <Typography type={"body2"}>Body 2</Typography>
      <Typography type={"body3"}>Body 3</Typography>
      <Typography type={"body4"}>Body 4</Typography>
      <Typography type={"button1"}>Button 1</Typography>
      <Typography type={"button2"}>Button 2</Typography>
    </View>
  </ScrollView>;
}
