export type FormStepName = '식품 정보' | '식품 위치' | '식품 날짜';

export type FormStep = { id: number; name: FormStepName };

export type FormLabel =
  | '냉장고 위치 선택'
  | '아이콘과 이름'
  | '카테고리'
  | '구매날짜'
  | '유통기한'
  | '자주 먹는 식품인가요?'
  | false;
