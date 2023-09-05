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
  color: string;
}

export const foodCategories: FoodCategory[] = [
  {
    id: 1,
    category: '신선식품류',
    image: 'category-fresh.png',
    icon: 'leaf',
    color: '#4db06c',
  },
  {
    id: 2,
    category: '간편·즉석식품류',
    image: 'category-instant.png',
    icon: 'food-takeout-box',
    color: '#888',
  },
  {
    id: 3,
    category: '정육·수산',
    image: 'category-meat-fish.png',
    icon: 'food-steak',
    color: '#d54e42',
  },
  {
    id: 4,
    category: '간식류',
    image: 'category-dessert.png',
    icon: 'ice-cream',
    color: '#ff66b8',
  },
  {
    id: 5,
    category: '베이커리·잼',
    image: 'category-bakery.png',
    icon: 'food-croissant',
    color: '#c65701',
  },

  {
    id: 6,
    category: '계란·유제품류',
    image: 'category-egg-dairy.png',
    icon: 'egg',
    color: '#ffb668',
  },
  {
    id: 7,
    category: '국·반찬류',
    image: 'category-sidedish.png',
    icon: 'pot-steam',
    color: '#9f7928',
  },
  {
    id: 8,
    category: '소스·조미료·오일·장류',
    image: 'category-sauce.png',
    icon: 'soy-sauce',
    color: '#6b5fff',
  },

  {
    id: 9,
    category: '생수·음료수·커피·주류',
    image: 'category-drink.png',
    icon: 'cup',
    color: '#3a6ae9',
  },
];
