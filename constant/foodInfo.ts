import { getFormattedDate } from '../util';
import { Category } from './foodCategories';
import { CompartmentNum, Space } from './fridgeInfo';

export type FoodInfo = { [key: string]: string | boolean | Date };

export interface Food {
  id: string;
  name: string;
  space: Space | '팬트리';
  category: Category;
  purchaseDate: string;
  expiredDate: string;
  compartmentNum?: CompartmentNum;
  quantity: string;
  memo: string;
}

export const initialFridgeFood: Food = {
  id: 'food_initial',
  name: '',
  category: '신선식품류',
  purchaseDate: '',
  expiredDate: getFormattedDate(new Date(), 'YYYY-MM-DD'),
  space: '냉장실 안쪽',
  compartmentNum: '1번',
  quantity: '',
  memo: '',
};

export const initialPantryFood: Food = {
  id: 'pantryFood_initial',
  category: '간식류',
  name: '',
  expiredDate: getFormattedDate(new Date(), 'YYYY-MM-DD'),
  purchaseDate: '',
  space: '팬트리',
  quantity: '',
  memo: '',
};

export const MAX_LIMIT = 30;
