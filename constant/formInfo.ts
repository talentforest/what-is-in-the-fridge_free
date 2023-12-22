export type FormStepName = '기본정보' | '위치' | '추가정보';

export type FormStep = { step: number; name: FormStepName };

export type FormLabelType =
  | '추가할 식료품의 위치'
  | '식료품 위치 수정'
  | '식료품 이름'
  | '카테고리'
  | '구매날짜'
  | '소비기한'
  | '수량'
  | '메모';

export const formTwoSteps: FormStep[] = [
  { step: 1, name: '기본정보' },
  { step: 2, name: '추가정보' },
];

export const formThreeSteps: FormStep[] = [
  { step: 1, name: '기본정보' },
  { step: 2, name: '위치' },
  { step: 3, name: '추가정보' },
];
