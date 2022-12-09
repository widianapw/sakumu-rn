/**
 * Created by Widiana Putra on 08/12/2022
 * Copyright (c) 2022 - Made with love
 */

import React from "react";
import { Accordion, Page, Stack, Toolbar } from "../../../tmd";
import { Image, ScrollView } from "react-native";
import Typography from "../../../tmd/components/Typography/Typography";

export default function AccordionTDSScreen() {
  return <Page>
    <Toolbar title={"NOT FINISHED"} />
    <ScrollView>
      <Stack>
        <Accordion
          title={"Accordion 1"}
          content={
            <Stack p={8}>
              <Typography>Widiana Putra</Typography>
            </Stack>
          }
        />
        <Accordion
          title={"Accordion 2"}
          content={
            <Stack p={8}>
              <Image source={{ uri: "https://picsum.photos/200/300" }} style={{ width: "100%",aspectRatio:2}} />

            </Stack>
          }
        />
        <Accordion
          title={"Accordion 3"}
          content={
            <Stack items={"center"} content={"center"} p={8}>
              <Image source={{ uri: "https://picsum.photos/300/300" }} style={{ width: 300, height: 300 }} />
            </Stack>
          }
        />
      </Stack>
    </ScrollView>
  </Page>;
}
