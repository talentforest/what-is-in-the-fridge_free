import getEnvVars from '../environment';

const { apiUrl } = getEnvVars();

export const BASE_PATH =
  'https://apis.data.go.kr/B553748/CertImgListService/getCertImgListService';

export const getUrl = (productName?: string, number?: number) => {
  const productNum = number ? `&prdlstReportNo=${number}` : '';
  const productNm = productName ? `&prdlstNm=${productName}` : '';

  return `${BASE_PATH}?serviceKey=${apiUrl}${productNum}${productNm}&returnType=json&pageNo=1&numOfRows=30`;
};

export const getProducts = async (searchKeyword: string) => {
  let headers = new Headers({
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    Accept: 'application/json',
  });

  try {
    const response = await fetch(getUrl(searchKeyword), {
      headers,
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('API 요청이 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('error!!:', error);
  }
};

export const getData = (searchKeyword: string) => {
  return fetch(getUrl(searchKeyword)).then((res) => res.json());
};
