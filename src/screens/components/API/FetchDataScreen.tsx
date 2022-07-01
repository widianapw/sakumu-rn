/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { VStack } from "react-native-flex-layout";
import useFeaturedCatalogQuery from "../../../services/catalog/useFeaturedCatalogQuery";
import Typography from "../../../../tmd/components/Typography/Typography";
import { Button } from "../../../../tmd";

export default function FetchDataScreen() {
  const { catalogs, isLoadingCatalog, refetch, isRefetching } = useFeaturedCatalogQuery();
  return (
    <SafeAreaView>

      <ScrollView>
        <VStack p={16}>
          {
            (isLoadingCatalog) &&
            <Typography>Loading...</Typography>
          }
          {
            catalogs &&
            <>
              {
                catalogs?.data?.map((it, index) => {
                  return <Typography key={index}>{it.name}</Typography>;
                })
              }
            </>
          }

          <Button containerStyle={{
            marginTop: 8,
          }} onPress={refetch} loading={isLoadingCatalog}>Refetch Data</Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}
