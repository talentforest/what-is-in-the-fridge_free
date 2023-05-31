interface FoodCategory {
  id: number;
  category: Category;
  description?: string;
}

export type Category =
  | '신선식품'
  | '간편 · 즉석식품'
  | '계란 · 유제품'
  | '반찬'
  | '소스 · 조미료 · 오일 · 장류'
  | '디저트 식품'
  | '생수 · 음료수 · 커피 · 주류'
  | '기타식품';

export const foodCategories: FoodCategory[] = [
  {
    id: 1,
    category: '신선식품',
  },
  {
    id: 2,
    category: '간편 · 즉석식품',
  },
  {
    id: 7,
    category: '디저트 식품',
  },
  {
    id: 3,
    category: '반찬',
  },
  {
    id: 4,
    category: '계란 · 유제품',
  },
  {
    id: 6,
    category: '소스 · 조미료 · 오일 · 장류',
  },

  {
    id: 9,
    category: '생수 · 음료수 · 커피 · 주류',
  },
  {
    id: 10,
    category: '기타식품',
  },
];
