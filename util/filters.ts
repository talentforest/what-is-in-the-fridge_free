import { Category, foodCategories } from '../constant/foodCategories';

export type SpaceFilter = '냉장실' | '냉동실' | '팬트리';

export type AbsenceFilter = '없는 식료품';

export type ExpiredFilter =
  | '소비기한 만료'
  | '소비기한 3일 이내'
  | '소비기한 일주일 이내';

export type FavoriteFilter = '자주 먹는 식료품';

export type Filter =
  | SpaceFilter
  | AbsenceFilter
  | ExpiredFilter
  | Category
  | FavoriteFilter
  | '전체';

export type FilterObj = { filter: Filter; icon?: string };

export const entireFilterObj: FilterObj = { filter: '전체', icon: '' };

export const favoriteFilterObj: FilterObj = {
  filter: '자주 먹는 식료품',
  icon: 'tag-heart',
};

export const spaceFilters: FilterObj[] = [
  { filter: '냉장실' },
  { filter: '냉동실' },
  { filter: '팬트리' },
];

export const existAbsenceFilters: FilterObj[] = [
  { filter: '없는 식료품', icon: 'food-off-outline' },
];

export const expiredFilters: FilterObj[] = [
  { filter: '소비기한 만료' },
  { filter: '소비기한 3일 이내' },
  { filter: '소비기한 일주일 이내' },
];

export const categoryFilters: FilterObj[] = foodCategories.map(
  ({ category, icon }) => {
    return { filter: category, icon };
  }
);
