export type FormStepName = '기본정보' | '날짜정보' | '위치정보' | '추가정보';

export type FormStep = { step: number; name: FormStepName };

export type FormLabelType =
  | '위치'
  | '추가할 식료품의 위치'
  | '자주 먹는 식료품'
  | '식료품 위치 수정'
  | '식료품 이름'
  | '카테고리'
  | '구매날짜'
  | '소비기한'
  | '수량'
  | '메모';

export const formThreeSteps: FormStep[] = [
  { step: 1, name: '기본정보' },
  { step: 2, name: '날짜정보' },
  { step: 3, name: '추가정보' },
];

export const formFourSteps: FormStep[] = [
  { step: 1, name: '기본정보' },
  { step: 2, name: '날짜정보' },
  { step: 3, name: '위치정보' },
  { step: 4, name: '추가정보' },
];
