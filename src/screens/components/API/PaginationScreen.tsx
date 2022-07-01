/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import Typography from "../../../../tmd/components/Typography/Typography";
import { CatalogItem } from "../../../models/catalog/Catalog";
import { FlatList, View } from "react-native";
import useCatalogInfiniteQuery from "../../../services/catalog/useCatalogInfiniteQuery";
import Page from "../../../../tmd/components/Page";

export default function PaginationScreen() {
  const { catalogs, isLoadingCatalog, isFetchingNextPage, fetchNext } = useCatalogInfiniteQuery();

  const renderItem = (item: CatalogItem) => {
    return <View style={{
      paddingVertical: 32,
    }}>
      <Typography>{item?.name}</Typography>
    </View>;
  };
  return (
    <Page>

      <View style={{
        flex: 1,
      }}>
        {
          isLoadingCatalog &&
          <Typography>Loading...</Typography>
        }
        {
          catalogs &&
          <View style={{ flexDirection: "column", flex: 1 }}>
            <FlatList
              style={{
                flexGrow: 1,
                padding: 16,
              }}
              onEndReached={fetchNext}
              data={catalogs}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item, number) => item?.id}
            />
            {
              isFetchingNextPage &&
              <Typography style={{
                padding: 16,
              }}>Fetching next page...</Typography>
            }
          </View>
        }
      </View>
    </Page>
  );
}
