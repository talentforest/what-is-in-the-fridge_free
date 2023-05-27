interface FoodCategory {
  id: number;
  category: Category;
}

export type Category =
  | '채소'
  | '과일'
  | '정육 · 수산'
  | '우유 · 계란 · 유제품'
  | '간편식품'
  | '통조림 · 햄'
  | '소스 · 조미료 · 오일 · 장류'
  | '아이스크림 · 과자 · 초콜릿'
  | '빵 · 떡 · 잼'
  | '면류 · 곡류'
  | '견과류 · 콩류'
  | '반찬'
  | '생수 · 음료수 · 커피'
  | '주류';

export const foodCategories: FoodCategory[] = [
  {
    id: 1,
    category: '채소',
  },
  {
    id: 2,
    category: '과일',
  },
  {
    id: 3,
    category: '정육 · 수산',
  },
  {
    id: 4,
    category: '우유 · 계란 · 유제품',
  },
  {
    id: 5,
    category: '간편식품',
  },
  {
    id: 6,
    category: '통조림 · 햄',
  },
  {
    id: 7,
    category: '반찬',
  },
  {
    id: 8,
    category: '소스 · 조미료 · 오일 · 장류',
  },
  {
    id: 9,
    category: '아이스크림 · 과자 · 초콜릿',
  },
  {
    id: 10,
    category: '빵 · 떡 · 잼',
  },
  {
    id: 11,
    category: '면류 · 곡류',
  },
  {
    id: 12,
    category: '견과류 · 콩류',
  },
  {
    id: 13,
    category: '생수 · 음료수 · 커피',
  },
  {
    id: 14,
    category: '주류',
  },
];
