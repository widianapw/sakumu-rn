import useCatalogService from "./useCatalogService";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { CatalogListResponse } from "../../models/catalog/Catalog";
import { useEffect, useState } from "react";

/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
export default function useCatalogInfiniteQuery(search: string) {
  const { getCatalogs } = useCatalogService();
  const { showErrorBS } = useBottomSheet();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    error,
    isError,
    ...rest
  } = useInfiniteQuery<CatalogListResponse>(["catalogs", search], (par) => {
    return getCatalogs(par.pageParam, search);
  }, {
    getNextPageParam: (lastPage) => (lastPage.meta.current_page < lastPage.meta.total) ? lastPage.meta.current_page + 1 : undefined,
  });

  const mappedData = data?.pages?.map(it => it.data).flat();

  useEffect(() => {
    if (error) {
      showErrorBS(error);
    }
  }, [isError]);

  // useEffect(() => {
  //   client.removeQueries("catalogs");
  // }, []);


  const fetchNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const refresh = async () => {
    try {
      setIsRefreshing(true);
      await rest.refetch();
      setIsRefreshing(false);
    } catch (e) {
      setIsRefreshing(false);
    }
  };

  return {
    catalogs: mappedData,
    isLoadingCatalog: isLoading,
    fetchNext,
    refresh,
    isRefreshing,
    ...rest,
  };
}
