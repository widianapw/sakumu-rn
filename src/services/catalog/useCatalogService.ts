/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import useBaseService from "../useBaseService";
import { CatalogListResponse } from "../../models/catalog/Catalog";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";

export default function useCatalogService() {
  const { getAPI } = useBaseService();
  const { showErrorBS } = useBottomSheet();

  const getCatalogInfinite = (page: number = 1, search: string) => {
    return getAPI<CatalogListResponse>(`products`, {
      params: {
        page: page,
        store: 1,
        search: search,
      },
    });
  };

  const getFeaturedCatalog = async () => {
    try {
      const res = await getAPI<CatalogListResponse>("products");
      return res;
    } catch (e) {
      showErrorBS(e);
    }
  };

  return {
    getCatalogs: getCatalogInfinite,
    getFeaturedCatalog,
  };
}
