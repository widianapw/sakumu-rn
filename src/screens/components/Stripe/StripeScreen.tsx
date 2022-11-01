// import React, { useState } from "react";
// import { Button, GridList, Image, Page, Stack, Surface, Toolbar, useTheme } from "../../../../tmd";
// import Typography from "../../../../tmd/components/Typography/Typography";
// import useFeaturedCatalogQuery from "../../../services/catalog/useFeaturedCatalogQuery";
// import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
// import useTransactionService, { CreateTransactionStripeReq } from "../../../services/transaction/useTransactionService";
// import { Alert } from "react-native";


export default function StripeScreen() {
  return <></>;
  // const { colors } = useTheme();
  // const { catalogs } = useFeaturedCatalogQuery();
  // const { initPaymentSheet, presentPaymentSheet } = useStripe();
  // const { createTransactionStripeAPI } = useTransactionService();
  // const [isLoading, setIsLoading] = useState(false);
  // const [publishableKey, setPublishableKey] = useState("");
  // const openPaymentSheet = async () => {
  //   try {
  //     setIsLoading(true);
  //     const req: CreateTransactionStripeReq = {
  //       items: catalogs?.data.map((item) => {
  //         return {
  //           id: item.id,
  //           quantity: 1,
  //         };
  //       }),
  //     };
  //     const response = await createTransactionStripeAPI(req);
  //
  //     if (response) {
  //       const { client_secret, customer_id, publishable_key, ephemeral_key } = response.data;
  //       setPublishableKey(publishable_key);
  //       const { error: errorInit } = await initPaymentSheet({
  //         customerId: customer_id,
  //         customerEphemeralKeySecret: ephemeral_key,
  //         paymentIntentClientSecret: client_secret,
  //         appearance: undefined,
  //         applePay: undefined,
  //         customFlow: false,
  //         defaultBillingDetails: undefined,
  //         googlePay: undefined,
  //         merchantDisplayName: "TDS Demo",
  //         returnURL: "",
  //         setupIntentClientSecret: undefined,
  //         style: undefined,
  //         allowsDelayedPaymentMethods: true,
  //       });
  //       if (errorInit) {
  //         setIsLoading(false);
  //         console.log(errorInit);
  //       }
  //
  //       const { error } = await presentPaymentSheet();
  //
  //       if (error) {
  //         setIsLoading(false);
  //         Alert.alert(`Error code: ${error.code}`, error.message);
  //       } else {
  //         Alert.alert("Success", "Your order is confirmed!");
  //       }
  //     }
  //
  //   } catch (e) {
  //     console.log(e);
  //   }
  //
  //
  // };
  // return (
  //   <StripeProvider publishableKey={publishableKey}>
  //     <Page>
  //       <Toolbar title={"StripeScreen"} />
  //       <Stack p={16} style={{ flex: 1 }}>
  //         <GridList
  //           showsVerticalScrollIndicator={false}
  //           cols={1}
  //           spacing={8}
  //           data={catalogs?.data}
  //           renderItem={({ item, index }) => {
  //             return (
  //               <>
  //                 <Surface style={{ borderRadius: 8, padding: 8, margin: 2 }} elevation={2}>
  //                   <Stack direction={"row"} spacing={8}>
  //                     <Image source={{ uri: item?.image ?? "" }} style={{ width: 80, height: 80, borderRadius: 8 }} />
  //                     <Stack style={{ flex: 1 }}>
  //                       <Typography type={"title2"}
  //                                   style={{ color: colors.neutral.neutral_90 }}>{item?.name ?? ""}</Typography>
  //                       <Typography
  //                         numberOfLines={2}
  //                         type={"body3"}>{item?.description ?? ""}</Typography>
  //                       <Typography type={"title3"}
  //                                   style={{
  //                                     marginTop: 4,
  //                                     color: colors.primary.main,
  //                                   }}>${item?.price ?? ""}</Typography>
  //                     </Stack>
  //                   </Stack>
  //                 </Surface>
  //               </>
  //             );
  //           }}
  //         />
  //       </Stack>
  //       <Stack p={16} spacing={8} m={2}>
  //         <Typography style={{ alignSelf: "flex-start" }} type={"label1"}>
  //           Total Price:
  //           ${catalogs?.data?.map((it) => it.price).reduce((a, b) => a + b, 0)}</Typography>
  //         <Button
  //           loading={isLoading}
  //           onPress={openPaymentSheet}
  //           buttonStyle={{ width: "100%" }} size={"lg"} shape={"rect"}>Checkout</Button>
  //       </Stack>
  //     </Page>
  //   </StripeProvider>
  // );
}
