export type Category =
  | '신선식품류'
  | '정육·수산'
  | '간편·즉석식품류'
  | '계란·유제품류'
  | '간식류'
  | '국·반찬류'
  | '소스·조미료·오일·장류'
  | '생수·음료수·커피·주류'
  | '베이커리·잼';

export interface FoodCategory {
  id: number;
  category: Category;
  image: string;
  icon: string;
}

export const foodCategories: FoodCategory[] = [
  {
    id: 1,
    category: '신선식품류',
    image: 'category-fresh.png',
    icon: 'leaf',
  },
  {
    id: 2,
    category: '간편·즉석식품류',
    image: 'category-instant.png',
    icon: 'food-takeout-box',
  },
  {
    id: 3,
    category: '정육·수산',
    image: 'category-meat-fish.png',
    icon: 'food-steak',
  },
  {
    id: 4,
    category: '간식류',
    image: 'category-dessert.png',
    icon: 'ice-cream',
  },
  {
    id: 5,
    category: '베이커리·잼',
    image: 'category-bakery.png',
    icon: 'food-croissant',
  },

  {
    id: 6,
    category: '계란·유제품류',
    image: 'category-egg-dairy.png',
    icon: 'egg',
  },
  {
    id: 7,
    category: '국·반찬류',
    image: 'category-sidedish.png',
    icon: 'pot-steam',
  },
  {
    id: 8,
    category: '소스·조미료·오일·장류',
    image: 'category-sauce.png',
    icon: 'soy-sauce',
  },

  {
    id: 9,
    category: '생수·음료수·커피·주류',
    image: 'category-drink.png',
    icon: 'cup',
  },
];
