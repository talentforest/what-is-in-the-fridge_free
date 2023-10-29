export type AssetName =
  | 'question-face'
  | 'shoppinglist-food'
  | 'apple'
  | 'expired-foods'
  | 'meat';

export const getImgName: (title: string) => AssetName = (title: string) => {
  const assetName = title.includes('장보기 식료품')
    ? 'shoppinglist-food'
    : title.includes('자주 먹는 식료품')
    ? 'question-face'
    : title.includes('식료품이 아직 없어요')
    ? 'meat'
    : title.includes('소비기한 주의 식료품')
    ? 'expired-foods'
    : 'apple';

  return assetName;
};
