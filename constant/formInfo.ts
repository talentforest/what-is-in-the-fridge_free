export type FormStepName = '식품 정보' | '식품 위치' | '식품 날짜';

export type FormStep = { step: number; name: FormStepName };

export type FormLabelType =
  | '추가할 식료품의 위치'
  | '식료품 이름'
  | '카테고리'
  | '구매날짜'
  | '유통기한'
  | '자주 먹는 식료품';

export const foodForm = [
  '식료품 이름',
  '카테고리',
  '자주 먹는 식품',
  '구매날짜',
  '유통기한',
];

export const shoppingListForm = [...foodForm, '냉장고 위치 선택'];

export const formTwoSteps: FormStep[] = [
  { step: 1, name: '식품 정보' },
  { step: 2, name: '식품 날짜' },
];

export const formThreeSteps: FormStep[] = [
  { step: 1, name: '식품 위치' },
  { step: 2, name: '식품 정보' },
  { step: 3, name: '식품 날짜' },
];
