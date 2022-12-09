/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Button, Divider, Icon, Stack, TextField } from "../../tmd";
import Typography from "../../tmd/components/Typography/Typography";
import { useAuth } from "../providers/AuthProvider";
import Page from "../../tmd/components/Page";
import Toolbar from "../../tmd/components/Toolbar/Toolbar";
import { _componentGalleries } from "../data/_componentGalleries";

const MainScreen = ({ navigation }: any) => {
  const { user, logout, isLoadingLogout } = useAuth();
  const [search, setSearch] = useState("");
  const handleLogout = () => {
    logout();
  };

  const filteredList = useMemo(() => {
    if (search) {
      return _componentGalleries.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))?.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return _componentGalleries.sort((a, b) => a.title.localeCompare(b.title));
    }
  }, [search]);

  return (
    <Page>
      <Toolbar
        backable={false}
        center
        actionButton={
          <Button colorVariant={"danger"} variant={"secondary"} size={"sm"} onPress={handleLogout}>
            Logout
          </Button>
        }
        title={"RN TDS"}
      />
      <Stack p={16}>
        <TextField
          search
          placeholder={"Cari..."}
          onInvokeTextChanged={(val) => {
            setSearch(val);
          }}
        />
      </Stack>

      <FlatList
        data={filteredList}
        renderItem={({ item }) => {
          return <TouchableOpacity activeOpacity={0.8} onPress={item?.action}>
            <Stack>
              <Stack py={16} px={16} direction={"row"}>
                <Typography type={"label1"} style={{ flex: 1 }}>
                  {item?.title}
                </Typography>
                <Icon icon={"chevron-forward"} />
              </Stack>
              <Divider />
            </Stack>
          </TouchableOpacity>;
        }} />

    </Page>
  )
    ;
};

export default MainScreen;
