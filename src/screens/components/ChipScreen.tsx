/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useState } from "react";
import { ScrollView } from "react-native";
import Chip from "../../../tmd/components/Chip/Chip";
import { PickerItem } from "../../../tmd/model/PickerItem";
import Page from "../../../tmd/components/Page";
import Stack from "../../../tmd/components/Layout/Stack";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";
import useCatalogService from "../../services/catalog/useCatalogService";
import _countries from "../../../tmd/data/_countries";
import { Button } from "../../../tmd";
import useFeaturedCatalogQuery from "../../services/catalog/useFeaturedCatalogQuery";
import Typography from "../../../tmd/components/Typography/Typography";
import ChipMultiPicker from "../../../tmd/components/Chip/ChipMultiPicker";

export default function ChipScreen(props) {
  const selected = props?.route?.params?.selected
  const { getFeaturedCatalog } = useCatalogService();
  const { catalogs } = useFeaturedCatalogQuery();
  const [selectedCountry, setSelectedCountry] = useState<undefined | number>(selected);
  // const handleGetCatalog = () => {
  //   getFeaturedCatalog().then(res => {
  //     setCatalogs(res?.data);
  //   });
  // };
  //
  // useEffect(() => {
  //   handleGetCatalog();
  // }, []);

  const name = "Widi";
  return (
    <Page>
      <Toolbar title={"Chip Screen"} />
      <ScrollView>
        <Stack p={16} spacing={8}>
          <Stack direction={"row"} spacing={8}>
            <Chip
              shape={"rect"}
              text={"Widiana"}
              selected={true}
            />
            <Chip text={"Widiana"} />
            <Chip text={"Widiana"} />
          </Stack>
          <Stack direction={"row"} spacing={8}>
            <Chip
              text={"Widiana"} selected variant={"outlined"} />
            <Chip text={"Widiana"} variant={"filled"} colorVariant={"secondary"} selected />
            <Chip text={"Widiana"} variant={"outlined"} />
          </Stack>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Stack direction={'row'} spacing={8}>
              <Chip
                shape={"rect"}
                text={"Catalog"}
                selectedPickerValue={selectedCountry}
                onResetPicker={() => {
                }}
                onPickerChanges={(obj) => {
                  setSelectedCountry(obj?.id);
                  // console.log("obj", obj);
                  // console.log("selected", selectedCountry);
                }}
                variant={"outlined"}
                type={"picker"}
                pickerList={
                  catalogs?.data?.map(it => {
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


          <Stack spacing={8} mt={16}>
            <Button onPress={() => {
              setSelectedCountry(1);
            }}>Set selected</Button>

            <Typography type={"title3"}>Chip MultiPicker</Typography>
            <ChipMultiPicker
              text={"initialy"}
              onPickerChanges={(value) => {
                console.log(value);
              }}
              // initialPickerValue={['61', "62"]}
              title={"Select Country"}
              onReset={() => {

              }}
              data={
                _countries.map((item) => {
                  const i: PickerItem = {
                    id: item.phone_code,
                    name: `+${item.phone_code} (${item.name})`,
                    image: item.flag,
                  };
                  return i;
                })
              }
            />
          </Stack>
        </Stack>
      </ScrollView>
    </Page>
  )
}
