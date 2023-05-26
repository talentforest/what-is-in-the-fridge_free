import { useQuery } from 'react-query';
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
  const { data, isLoading } = useQuery(
    ['search', deferredKeyword],
    () => getHaccpProducts(deferredKeyword),
    { enabled: deferredKeyword !== '' }
  );

  const products = data?.body?.items;

  return {
    isLoading,
    products,
  };
}
