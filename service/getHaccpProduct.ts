import getEnvVars from '../environment';

const { haccpApiKey } = getEnvVars();

const BASE_PATH =
  'https://apis.data.go.kr/B553748/CertImgListService/getCertImgListService';
const getUrl = (productName: string) => {
  return `${BASE_PATH}?serviceKey=${haccpApiKey}&prdlstNm=${productName}&returnType=json&pageNo=1&numOfRows=15`;
};

export const getHaccpProducts = async (searchKeyword: string) => {
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
