export type FormStepName = '식품 정보' | '식품 위치' | '식품 날짜';

export type FormStep = { id: number; name: FormStepName };

export type FormLabel =
  | '냉장고 위치 선택'
  | '식료품 이름'
  | '카테고리'
  | '구매날짜'
  | '유통기한'
  | '자주 먹는 식품';

export const foodForm = [
  '식료품 이름',
  '카테고리',
  '자주 먹는 식품',
  '구매날짜',
  '유통기한',
];

export const shoppingListForm = [...foodForm, '냉장고 위치 선택'];
