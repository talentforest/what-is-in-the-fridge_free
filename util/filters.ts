import { Category, foodCategories } from '../constant/foodCategories';

export type SpaceFilter = '냉장실' | '냉동실' | '실온보관';

export type AbsenceFilter = '없는 식료품';

export type ExpiredFilter =
  | '소비기한 만료'
  | '소비기한 3일 이내'
  | '소비기한 일주일 이내';

export type Filter =
  | SpaceFilter
  | AbsenceFilter
  | ExpiredFilter
  | Category
  | '카테고리별'
  | '전체';

export type FilterObj = { filter: Filter };

export const entireFilterObj: FilterObj = { filter: '전체' };

export const spaceFilters: FilterObj[] = [
  { filter: '냉장실' },
  { filter: '냉동실' },
  { filter: '실온보관' },
];

export const existAbsenceFilters: FilterObj[] = [{ filter: '없는 식료품' }];

export const expiredFilters: FilterObj[] = [
  { filter: '소비기한 만료' },
  { filter: '소비기한 3일 이내' },
  { filter: '소비기한 일주일 이내' },
];

export const categoryFilters: FilterObj[] = foodCategories.map(
  ({ category }) => {
    return { filter: category };
  }
);
