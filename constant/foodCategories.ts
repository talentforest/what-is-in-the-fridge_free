export type Category =
  | '신선식품류'
  | '정육/수산'
  | '간편/즉석식품류'
  | '라면/면류'
  | '유제품류/계란'
  | '간식류'
  | '국/반찬류'
  | '양념/장류/소스/오일'
  | '견과/잡곡류/가루'
  | '햄/통조림'
  | '생수/음료수/커피/주류'
  | '베이커리/잼';

export interface CategoryInfo {
  id: number;
  category: Category;
  image: string;
  icon: string;
  color: string;
}

export const foodCategories: CategoryInfo[] = [
  {
    id: 1,
    category: '신선식품류',
    image: 'category-fresh.png',
    icon: 'leaf',
    color: '#4db06c',
  },
  {
    id: 2,
    category: '정육/수산',
    image: 'category-meat-fish.png',
    icon: 'icon-meat-fish',
    color: '#d54e42',
  },
  {
    id: 3,
    category: '간식류',
    image: 'category-dessert.png',
    icon: 'cookie',
    color: '#8B2424',
  },
  {
    id: 4,
    category: '간편/즉석식품류',
    image: 'category-instant.png',
    icon: 'instant-box',
    color: '#ff9c11',
  },
  {
    id: 5,
    category: '라면/면류',
    image: 'category-noodle.png',
    icon: 'noodles',
    color: '#DC412C',
  },
  {
    id: 6,
    category: '국/반찬류',
    image: 'category-sidedish.png',
    icon: 'sidedish',
    color: '#9f7928',
  },
  {
    id: 7,
    category: '유제품류/계란',
    image: 'category-dairy-egg.png',
    icon: 'dairy-egg',
    color: '#ffb668',
  },

  {
    id: 8,
    category: '베이커리/잼',
    image: 'category-bakery-jam.png',
    icon: 'baguette',
    color: '#c65701',
  },

  {
    id: 9,
    category: '생수/음료수/커피/주류',
    image: 'category-drink.png',
    icon: 'cup-water',
    color: '#3a6ae9',
  },

  {
    id: 10,
    category: '견과/잡곡류/가루',
    image: 'category-powder.png',
    icon: 'peanut-grain',
    color: '#bd8773',
  },
  {
    id: 11,
    category: '햄/통조림',
    image: 'category-can.png',
    icon: 'can',
    color: '#08d9ff',
  },
  {
    id: 12,
    category: '양념/장류/소스/오일',
    image: 'category-sauce.png',
    icon: 'sauce',
    color: '#EEC800',
  },
];
