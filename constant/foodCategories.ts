interface FoodCategory {
  id: number;
  category: Category;
  description?: string;
}

export type Category =
  | '신선식품류'
  | '간편 · 즉석식품류'
  | '계란 · 유제품류'
  | '반찬류'
  | '소스 · 조미료 · 오일 · 장류'
  | '디저트 식품류'
  | '생수 · 음료수 · 커피 · 주류'
  | '기타식품류';

export const foodCategories: FoodCategory[] = [
  {
    id: 1,
    category: '신선식품류',
  },
  {
    id: 2,
    category: '간편 · 즉석식품류',
  },
  {
    id: 7,
    category: '디저트 식품류',
  },
  {
    id: 3,
    category: '반찬류',
  },
  {
    id: 4,
    category: '계란 · 유제품류',
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
    category: '기타식품류',
  },
];
