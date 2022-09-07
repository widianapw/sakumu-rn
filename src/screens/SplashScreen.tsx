import React, { useEffect } from "react";
import { Page, Stack } from "../../tmd";
import Typography from "../../tmd/components/Typography/Typography";
import { useDispatch } from "react-redux";

export default function SplashScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "DONE_LOADING_SPLASH",
      });
    }, 2000);
  }, []);


  return (
    <Page>
      <Stack style={{ flex: 1 }} items={"center"} content={"center"}>
        <Typography style={{ textAlign: "center" }} type={"label1"}>RN Starter Kit</Typography>
      </Stack>
    </Page>
  );
}
