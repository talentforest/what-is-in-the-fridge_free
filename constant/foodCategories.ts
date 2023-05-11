interface FoodCategory {
  id: number;
  category: Category;
}

export type Category =
  | '채소'
  | '과일'
  | '우유, 계란, 유제품'
  | '정육, 수산'
  | '밀키트, 간편식'
  | '양념, 조미료, 오일'
  | '아이스크림, 과자, 초콜릿'
  | '곡류, 면'
  | '견과류, 콩류'
  | '빵, 떡, 잼'
  | '통조림, 햄'
  | '생수, 음료수, 커피';

export const foodCategories: FoodCategory[] = [
  { id: 1, category: '채소' },
  { id: 2, category: '과일' },
  { id: 3, category: '우유, 계란, 유제품' },
  { id: 4, category: '정육, 수산' },
  { id: 5, category: '밀키트, 간편식' },
  { id: 6, category: '양념, 조미료, 오일' },
  { id: 7, category: '아이스크림, 과자, 초콜릿' },
  { id: 8, category: '곡류, 면' },
  { id: 9, category: '견과류, 콩류' },
  { id: 10, category: '빵, 떡, 잼' },
  { id: 11, category: '통조림, 햄' },
  { id: 12, category: '생수, 음료수, 커피' },
];