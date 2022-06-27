/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView } from "react-native";
import { VStack } from "react-native-flex-layout";
import { Button } from "../../../../tmd";
import useCredentialService from "../../../services/credential/useCredentialService";

export default function APIScreen({ navigation }: any) {
  const { checkCredential, isLoadingCheckCredential } = useCredentialService();
  const handlePost = () => {
    checkCredential("082146456432", "widianaputraa@gmail.com");
  };

  return <ScrollView>
    <VStack p={16} spacing={16}>
      <Button
        onPress={() => {
          navigation.navigate("FetchDataScreen");
        }}
      >
        Fetch data</Button>
      <Button
        onPress={() => {
          navigation.navigate("PaginationScreen");
        }}
      >
        Fetch Pagination</Button>
      <Button
        loading={isLoadingCheckCredential}
        onPress={handlePost}>
        POST / PATCH API
      </Button>
    </VStack>
  </ScrollView>;
}
