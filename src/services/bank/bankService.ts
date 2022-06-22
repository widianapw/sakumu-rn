/**
 * Created by Widiana Putra on 22/06/2022
 * Copyright (c) 2022 - Made with love
 */
import { client } from "../../utils/network";

export const getBankListAPI = async () => {
  try {
    console.log("GET DATA");
    return await client.get("bank1");
  } catch (e) {
    console.log("ERROR")
    console.log(JSON.stringify(e, null, 2));
    throw e;
  }
};
