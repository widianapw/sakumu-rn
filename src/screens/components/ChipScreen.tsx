/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Chip from "../../../tmd/components/Chip";
import { PickerItem } from "../../../tmd/model/PickerItem";
import Page from "../../../tmd/components/Page";
import Stack from "../../../tmd/components/Layout/Stack";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";
import useCatalogService from "../../services/catalog/useCatalogService";
import { CatalogItem } from "../../models/catalog/Catalog";
import _countries from "../../../tmd/data/_countries";

export default function ChipScreen() {
  const { getFeaturedCatalog } = useCatalogService();
  const [catalogs, setCatalogs] = useState<CatalogItem[] | undefined>([]);

  const handleGetCatalog = () => {
    getFeaturedCatalog().then(res => {
      setCatalogs(res?.data);
    });
  };

  useEffect(() => {
    handleGetCatalog();
  }, []);

  return (
    <Page>
      <Toolbar title={"Chip Screen"} />
      <ScrollView>
        <Stack p={16} spacing={8}>
          <Stack direction={"row"} spacing={8}>
            <Chip
              text={"Widiana"}
              selected
            />
            <Chip text={"Widiana"} />
            <Chip text={"Widiana"} />
          </Stack>
          <Stack direction={"row"} spacing={8}>
            <Chip text={"Widiana"} selected variant={"outlined"} />
            <Chip text={"Widiana"} variant={"outlined"} />
            <Chip text={"Widiana"} variant={"outlined"} />
          </Stack>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Stack direction={'row'} spacing={8}>
              <Chip
                shape={"rect"}
                text={"Catalog"}
                onResetPicker={() => {
                }}
                onPickerChanges={() => {
                }}
                variant={"outlined"}
                type={"picker"}
                pickerList={
                  catalogs?.map(it => {
                    const i: PickerItem = {
                      id: it.id,
                      name: it.name ?? "",
                    };
                    return i;
                  })
                }
              />
              <Chip
                onResetPicker={() => {

                }}
                pickerList={
                  _countries.slice(0, 2).map(it => {
                    const i: PickerItem = {
                      id: it.code,
                      name: it.name,
                    };
                    return i;
                  })
                }

                type={"picker"}
                text={"Widiana"} />
              <Chip text={"Widiana"} />
            </Stack>

          </ScrollView>
        </Stack>
      </ScrollView>
    </Page>
  )
}
