/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView, View } from "react-native";
import { Button, IconButton } from "../../../tmd";
import { VStack } from "react-native-flex-layout";
import TextButton from "../../../tmd/components/Button/TextButton";

export default function ButtonScreen() {
  return <ScrollView>
    <View style={{ padding: 16, flexDirection: "column" }}>
      <VStack spacing={8}>
        <IconButton
          shape={"rounded"}
          icon={"camera"}
          onPress={() => {
          }}
        />
        <IconButton
          variant={"secondary"}
          icon={"camera"} onPress={() => {
        }}
        />
        <IconButton
          variant={"tertiary"}
          icon={"camera"} onPress={() => {
        }}
        />
        <IconButton
          icon={"arrow-back"}
          themeSize={"lg"}
          onPress={() => {
          }}
        />
        <IconButton
          themeSize={"md"}
          icon={"arrow-back"} onPress={() => {
        }}
        />
        <IconButton
          themeSize={"sm"}
          icon={"arrow-back"} onPress={() => {
        }}
        />
        <TextButton
          onPress={() => {
          }}
        >
          TextButton
        </TextButton>
        <TextButton
          icon={{
            icon: "camera",
          }}
          underline
          onPress={() => {
          }}
        >
          TextButton
        </TextButton>

        <Button
          variant={"primary"}
          onPress={() => {
          }}>
          Primary
        </Button>
        <Button
          icon={{
            icon: "camera",
          }}
          variant={"primary"}
          onPress={() => {
          }}>
          Primary
        </Button>
        <Button
          loading
          variant={"primary"}
          onPress={() => {
          }}>
          Primary
        </Button>
        <Button
          onPress={() => {
          }}
          variant={"secondary"}
        >
          Secondary
        </Button>

        <Button
          loading
          onPress={() => {
          }}
          variant={"secondary"}
        >
          Secondary
        </Button>

        <Button
          icon={{
            icon: "camera",
          }}
          onPress={() => {
          }}
          variant={"secondary"}
        >
          Secondary
        </Button>
        <Button
          onPress={() => {
          }}
          variant={"tertiary"}
        >
          Tertiary
        </Button>
        <Button
          icon={{
            icon: "camera",
          }}
          onPress={() => {
          }}
          variant={"tertiary"}
        >
          Tertiary
        </Button>
        <Button

          onPress={() => {
          }}
          variant={"tertiary"}
        >
          Tertiary
        </Button>

        <Button
          onPress={() => {
          }}
          size={"sm"}>
          Button Small
        </Button>

        <Button
          onPress={() => {
          }}
          size={"md"}>
          Button Medium
        </Button>

        <Button
          onPress={() => {
          }}
          size={"lg"}>
          Button Large
        </Button>

      </VStack>
    </View>
  </ScrollView>;
}
