import { useInfiniteQuery } from 'react-query';
import { getHaccpProducts } from '../service/getHaccpProduct';

export interface HaccpProductType {
  item: {
    nutrient: string;
    rawmtrl: string;
    prdlstNm: string;
    imgurl2: string;
    barcode: string;
    imgurl1: string;
    productGb: string;
    seller: string;
    prdkindstate: string;
    rnum: string;
    manufacture: string;
    prdkind: string;
    capacity: string;
    prdlstReportNo: string;
    allergy: string;
  };
}

export default function useGetProduct(deferredKeyword: string) {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['search', deferredKeyword],
      queryFn: ({ pageParam }) => getHaccpProducts(deferredKeyword, pageParam),
      getNextPageParam: (lastPage) => {
        if (lastPage?.nextCursor) return lastPage?.nextCursor;
      },
      enabled: deferredKeyword !== '',
      initialData: { pageParams: [1], pages: [{ nextCursor: 2, pages: [] }] },
    });

  return {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
  };
}
