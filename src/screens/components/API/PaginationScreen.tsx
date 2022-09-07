/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import Typography from "../../../../tmd/components/Typography/Typography";
import { CatalogItem } from "../../../models/catalog/Catalog";
import useCatalogInfiniteQuery from "../../../services/catalog/useCatalogInfiniteQuery";
import Page from "../../../../tmd/components/Page";
import GridList from "../../../../tmd/components/FlatList/GridList";
import { CircularProgressBar, Stack, Surface } from "../../../../tmd";
import { ScrollView } from "react-native";
import Chip from "../../../../tmd/components/Chip";
import SearchToolbar from "../../../../tmd/components/Toolbar/SearchToolbar";

export default function PaginationScreen() {
  const [search, setSearch] = useState("");
  const {
    catalogs,
    isLoadingCatalog,
    isFetchingNextPage,
    fetchNext,
    refresh,
    isRefreshing,
  } = useCatalogInfiniteQuery(search);

  const renderItem = (item: CatalogItem, index: number) => {
    return <Surface
      elevation={4}
      style={{
        padding: 16,
        flex: 1,
        borderRadius: 8,
      }}>
      <Typography>{item?.name}</Typography>
    </Surface>;
  };

  return (
    <Page>
      <SearchToolbar title={"PaginationScreen"} onPressSearch={(v) => {
        setSearch(v);
      }} />

      <Stack
        style={{ flex: 1 }}>
        <Stack>
          <ScrollView style={{
            marginTop: 8,
          }} horizontal showsHorizontalScrollIndicator={false}>
            <Stack direction={"row"} spacing={8} pl={16}>
              <Chip
                shape={"rect"}
                text={"Chip Sample"}
                icon={{
                  icon: "camera",
                }} />
              <Chip
                shape={"rect"}
                text={"Chip Sample"}
                icon={{
                  icon: "camera",
                }} />
              <Chip
                shape={"rect"}
                text={"Chip Sample"}
                icon={{
                  icon: "camera",
                }} />
              <Chip
                shape={"rect"}
                text={"Chip Sample"}
                icon={{
                  icon: "camera",
                }} />
              <Chip
                shape={"rect"}
                text={"Chip Sample"}
                icon={{
                  icon: "camera",
                }} />

            </Stack>
          </ScrollView>
        </Stack>
        {
          <GridList

            padding={16}
            onRefresh={refresh}
            refreshing={isRefreshing}
            spacing={16}
            cols={1}
            style={{
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
            onEndReached={fetchNext}
            data={catalogs}
            keyExtractor={(item, number) => item?.id}
            renderItem={({ item, index }) => renderItem(item, index)}
            ListEmptyComponent={() => {
              if (!isLoadingCatalog) {
                return <Typography>empty</Typography>;
              } else {
                return <></>;
              }
            }}
            ListFooterComponent={() => {
              return <>
                {
                  isFetchingNextPage &&
                  <Stack p={8}>
                    <CircularProgressBar />
                  </Stack>
                }
              </>;
            }}
          />
        }
      </Stack>
    </Page>
  );
}
