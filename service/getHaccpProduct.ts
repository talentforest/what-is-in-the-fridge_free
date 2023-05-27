import getEnvVars from '../environment';

const { haccpApiKey } = getEnvVars();

interface Props {
  keyword: string;
  pageParam: number;
}

const BASE_PATH =
  'https://apis.data.go.kr/B553748/CertImgListService/getCertImgListService';
const getUrl = ({ keyword, pageParam }: Props) => {
  return `${BASE_PATH}?serviceKey=${haccpApiKey}&prdlstNm=${keyword}&returnType=json&pageNo=${pageParam}&numOfRows=20`;
};

export const getHaccpProducts = async (keyword: string, pageParam: number) => {
  let headers = new Headers({
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    Accept: 'application/json',
  });

  try {
    const response = await fetch(getUrl({ keyword, pageParam }), {
      headers,
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('API 요청이 실패했습니다.');
    }
    const data = await response.json();

    return {
      pages: data,
      nextCursor: pageParam + 1,
    };
  } catch (error) {
    console.error('error!!:', error);
  }
};
