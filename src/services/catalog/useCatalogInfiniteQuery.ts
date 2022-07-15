import useCatalogService from "./useCatalogService";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import { useInfiniteQuery } from "react-query";
import { CatalogListResponse } from "../../models/catalog/Catalog";
import { useEffect } from "react";

/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
export default function useCatalogInfiniteQuery() {
  const { getCatalogs } = useCatalogService();
  const { showErrorBS } = useBottomSheet();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    error,
    isError,
    ...rest
  } = useInfiniteQuery<CatalogListResponse>(["catalogs"], (par) => {
    return getCatalogs(par.pageParam);
  }, {
    getNextPageParam: (lastPage) => lastPage.meta.current_page + 1,
  });

  const mappedData = data?.pages?.map(it => it.data).flat();

  useEffect(() => {
    if (error) {
      showErrorBS(error);
    }
  }, [isError]);

  const fetchNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return {
    catalogs: mappedData,
    isLoadingCatalog: isLoading,
    fetchNext,
    ...rest,
  };
}
