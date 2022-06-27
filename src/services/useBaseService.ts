import client from "../utils/network/client";
import { AxiosRequestConfig } from "axios";
import { useBottomSheet } from "../../tmd/providers/BottomSheetProvider";

/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
export default function useBaseService() {
  const postAPI = async (route: string, body: any, onError?: (e: unknown) => void) => {
    try {
      const res = await client.post(route, body);
      return res.data;
    } catch (e) {
      throw e;
    }
  };
  const patchAPI = async (route: string, body?: any) => {
    try {
      const res = await client.patch(route, body);
      return res.data;
    } catch (e) {
      throw e;
    }
  };

  const deleteAPI = async (route: string, body?: any) => {
    try {
      const res = await client.delete(route, body);
      return res.data;
    } catch (e) {
      throw e;
    }
  };

  const getAPI = async <E>(route: string, config?: AxiosRequestConfig<any>) => {
    try {
      return await client.get(route, config) as E;
    } catch (e) {
      throw e;
    }
  };

  return {
    postAPI,
    getAPI,
    patchAPI,
    deleteAPI,
  };
}
