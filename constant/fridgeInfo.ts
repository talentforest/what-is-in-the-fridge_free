import { InsideDisplayType } from '../redux/slice/fridgeInfoSlice';

export type StorageType = '팬트리' | '냉장고';
export type SpaceType = '냉장실' | '냉동실';
export type SpaceSide = '안쪽' | '문쪽';

export type Space =
  | '냉장실 안쪽'
  | '냉장실 문쪽'
  | '냉동실 안쪽'
  | '냉동실 문쪽'
  | '팬트리';

export type CompartmentNum = '1번' | '2번' | '3번' | '4번' | '5번';

export type FoodPosition = {
  space: Space;
  compartmentNum: CompartmentNum;
};

export const InsideDisplay: InsideDisplayType[] = [
  '칸별로 보기',
  '목록으로 보기',
];
