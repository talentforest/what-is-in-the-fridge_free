export type FormStepName = '기본정보' | '위치' | '소비기한' | '선택정보';

export type FormStep = { step: number; name: FormStepName };

export type FormLabelType =
  | '추가할 식료품의 위치'
  | '식료품 이름'
  | '카테고리'
  | '구매날짜'
  | '소비기한'
  | '자주 먹는 식료품'
  | '수량'
  | '메모';

export const formThreeSteps: FormStep[] = [
  { step: 1, name: '기본정보' },
  { step: 2, name: '소비기한' },
  { step: 3, name: '선택정보' },
];

export const formFourSteps: FormStep[] = [
  { step: 1, name: '기본정보' },
  { step: 2, name: '위치' },
  { step: 3, name: '소비기한' },
  { step: 4, name: '선택정보' },
];
