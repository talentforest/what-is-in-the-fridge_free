import { Asset } from 'expo-asset';
import { CompartmentNum } from '../constant/fridgeInfo';

export type AssetName =
  | 'shoppinglist'
  | 'expired-foods'
  | 'favorite-foods'
  | 'apple'
  | 'meat'
  | 'carrot'
  | 'green-onion';

export const getImgName: (
  title: string,
  compartmentNum?: CompartmentNum
) => AssetName = (title: string, compartmentNum?: CompartmentNum) => {
  const assetName = title.includes('장보기 식료품')
    ? 'shoppinglist'
    : title.includes('자주 먹는 식료품')
    ? 'favorite-foods'
    : title.includes('소비기한 주의 식료품')
    ? 'expired-foods'
    : compartmentNum === '1번'
    ? 'meat'
    : compartmentNum === '2번'
    ? 'apple'
    : compartmentNum === '3번'
    ? 'carrot'
    : compartmentNum === '4번'
    ? 'green-onion'
    : 'apple';

  return assetName;
};

export const findAsset = (assets: Asset[], name: string) => {
  return assets?.find((asset) => asset.name === name);
};
