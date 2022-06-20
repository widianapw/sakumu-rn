/**
 * Created by Widiana Putra on 20/06/2022
 * Copyright (c) 2022 - Made with love
 */
import { ScrollView } from "react-native";
import { VStack } from "react-native-flex-layout";
import { Button } from "../../../tmd";

export default function BottomSheetScreen() {
  return (
    <ScrollView>
      <VStack spacing={16}>
        <Button>Alert Bottom SHIT</Button>
        <Button>ERROR BOTTOM SHIT</Button>
        <Button>DATE FILTER BOTTOM SHIT</Button>
      </VStack>
    </ScrollView>
  );
}
