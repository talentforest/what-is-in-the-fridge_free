import { Category, foodCategories } from '../constant/foodCategories';

export type SpaceFilter = '냉장실' | '냉동실';
export type ExistAbsenceFilter = '냉장고에 있음' | '냉장고에 없음';
export type ExpiredFilter = '유통기한 지남' | '유통기한 3일 이내';
export type Filter =
  | SpaceFilter
  | ExistAbsenceFilter
  | ExpiredFilter
  | Category
  | '전체';
export type FilterObj = { filter: Filter; icon: string };

export const entireFilterObj: FilterObj = { filter: '전체', icon: '' };

export const spaceFilters: FilterObj[] = [
  { filter: '냉장실', icon: 'fridge' },
  { filter: '냉동실', icon: 'fridge' },
];

export const existAbsenceFilters: FilterObj[] = [
  { filter: '냉장고에 없음', icon: 'fridge-off-outline' },
  { filter: '냉장고에 있음', icon: 'fridge-outline' },
];

export const expiredFilters: FilterObj[] = [
  { filter: '유통기한 지남', icon: 'circle-medium' },
  { filter: '유통기한 3일 이내', icon: 'circle-medium' },
];

export const categoryFilters: FilterObj[] = foodCategories.map(
  ({ category, icon }) => {
    return { filter: category, icon };
  }
);
