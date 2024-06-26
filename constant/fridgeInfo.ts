export type StorageType = '실온보관' | '냉장고';
export type SpaceType = '냉장실' | '냉동실';
export type SpaceSide = '안쪽' | '문쪽';

export type Space =
  | '냉장실 안쪽'
  | '냉장실 문쪽'
  | '냉동실 안쪽'
  | '냉동실 문쪽'
  | '실온보관';

export type CompartmentNum = '1번' | '2번' | '3번' | '4번' | '5번';

export type FoodPosition = {
  space: Space;
  compartmentNum: CompartmentNum;
};
