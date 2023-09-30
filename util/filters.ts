import { Category, foodCategories } from '../constant/foodCategories';

export type SpaceFilter = '냉장실' | '냉동실' | '팬트리';
export type AbsenceFilter = '없는 식료품';
export type ExpiredFilter = '소비기한 만료' | '소비기한 3일 이내';
export type FavoriteFilter = '자주 먹는 식료품';

export type Filter =
  | SpaceFilter
  | AbsenceFilter
  | ExpiredFilter
  | Category
  | FavoriteFilter
  | '카테고리'
  | '전체';
export type FilterObj = { filter: Filter; icon: string };

export const entireFilterObj: FilterObj = { filter: '전체', icon: '' };

export const favoriteFilterObj: FilterObj = {
  filter: '자주 먹는 식료품',
  icon: 'tag-heart',
};

export const spaceFilters: FilterObj[] = [
  { filter: '냉장실', icon: 'fridge' },
  { filter: '냉동실', icon: 'fridge' },
  { filter: '팬트리', icon: 'inbox-multiple' },
];

export const existAbsenceFilters: FilterObj[] = [
  { filter: '없는 식료품', icon: 'food-off-outline' },
];

export const expiredFilters: FilterObj[] = [
  { filter: '소비기한 만료', icon: 'circle-medium' },
  { filter: '소비기한 3일 이내', icon: 'circle-medium' },
];

export const categoryFilters: FilterObj[] = foodCategories.map(
  ({ category, icon }) => {
    return { filter: category, icon };
  }
);
