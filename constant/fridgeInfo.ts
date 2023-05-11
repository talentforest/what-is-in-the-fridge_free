export type Space =
  | '냉장실 안쪽'
  | '냉장실 문쪽'
  | '냉동실 안쪽'
  | '냉동실 문쪽';

export type CompartmentNum = '1번' | '2번' | '3번';

export const SpaceName: Space[] = [
  '냉동실 안쪽',
  '냉동실 문쪽',
  '냉장실 안쪽',
  '냉장실 문쪽',
];

export type CompartmentType = {
  space: Space;
  compartmentNum: CompartmentNum;
};
