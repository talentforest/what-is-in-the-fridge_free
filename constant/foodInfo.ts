import { getFormattedDate } from '../util';
import { Category } from './foodCategories';
import { CompartmentNum, Space } from './fridgeInfo';

export type FoodInfo = { [key: string]: string | boolean | Date };

interface DefaultFoodInfo {
  id: string;
  image: string;
  name: string;
  category: Category;
  purchaseDate: string;
  expiredDate: string;
  favorite: boolean;
}

export interface Food extends DefaultFoodInfo {
  space: Space;
  compartmentNum: CompartmentNum;
}

export interface PantryFood extends DefaultFoodInfo {
  space: '펜트리';
}

export const initialFood: Food = {
  id: 'food_initial',
  image: '',
  name: '',
  category: '신선식품류',
  purchaseDate: '',
  expiredDate: getFormattedDate(new Date()),
  favorite: false,
  space: '냉장실 안쪽',
  compartmentNum: '1번',
};

export const initialPantryFood: PantryFood = {
  id: 'pantryFood_initial',
  category: '간식류',
  favorite: false,
  space: '펜트리',
  name: '',
  image: '',
  purchaseDate: '',
  expiredDate: '',
};
