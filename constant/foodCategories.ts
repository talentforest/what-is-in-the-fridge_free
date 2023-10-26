export type Category =
  | '신선식품류'
  | '정육·수산·계란'
  | '간편·즉석식품류'
  | '라면·면류'
  | '유제품류'
  | '간식류'
  | '국·반찬류'
  | '양념·장류·소스·오일'
  | '견과·잡곡류·가루'
  | '햄·통조림'
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
    category: '정육·수산·계란',
    image: 'category-meat-fish-egg.png',
    icon: 'icon-meat-fish-egg.svg',
    color: '#d54e42',
  },
  {
    id: 3,
    category: '간편·즉석식품류',
    image: 'category-instant.png',
    icon: 'hamburger',
    color: '#ff9c11',
  },
  {
    id: 4,
    category: '라면·면류',
    image: 'category-noodle.png',
    icon: 'noodles',
    color: '#666',
  },
  {
    id: 5,
    category: '국·반찬류',
    image: 'category-sidedish.png',
    icon: 'pot-steam',
    color: '#9f7928',
  },
  {
    id: 6,
    category: '유제품류',
    image: 'category-dairy.png',
    icon: 'cheese',
    color: '#ffb668',
  },
  {
    id: 7,
    category: '간식류',
    image: 'category-dessert.png',
    icon: 'cookie',
    color: '#7f4f2e',
  },
  {
    id: 8,
    category: '베이커리·잼',
    image: 'category-bakery.png',
    icon: 'baguette',
    color: '#c65701',
  },

  {
    id: 9,
    category: '생수·음료수·커피·주류',
    image: 'category-drink.png',
    icon: 'cup-water',
    color: '#3a6ae9',
  },

  {
    id: 10,
    category: '견과·잡곡류·가루',
    image: 'category-powder.png',
    icon: 'grain',
    color: '#bd8773',
  },
  {
    id: 11,
    category: '양념·장류·소스·오일',
    image: 'category-sauce.png',
    icon: 'soy-sauce',
    color: '#ff3838',
  },
  {
    id: 12,
    category: '햄·통조림',
    image: 'category-can.png',
    icon: 'hockey-puck',
    color: '#08d9ff',
  },
];
