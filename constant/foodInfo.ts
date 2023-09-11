import { getFormattedDate } from '../util';
import { Category } from './foodCategories';
import { CompartmentNum, Space } from './fridgeInfo';

export type FoodInfo = { [key: string]: string | boolean | Date };

export interface Food {
  id: string;
  image: string;
  name: string;
  space: Space | '팬트리';
  category: Category;
  purchaseDate: string;
  expiredDate: string;
  favorite: boolean;
  compartmentNum?: CompartmentNum;
}

export const initialFood: Food = {
  id: 'food_initial',
  name: '',
  category: '신선식품류',
  favorite: false,
  purchaseDate: '',
  expiredDate: getFormattedDate(new Date()),
  space: '냉장실 안쪽',
  compartmentNum: '1번',
  image: '',
};

export const initialPantryFood: Food = {
  id: 'pantryFood_initial',
  category: '간식류',
  name: '',
  favorite: false,
  expiredDate: getFormattedDate(new Date()),
  purchaseDate: '',
  space: '팬트리',
  image: '',
};
