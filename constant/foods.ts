import { getTodayIsoDateKr } from '../util';
import { Category } from './foodCategories';
import { CompartmentNum, Space } from './fridgeInfo';

export type FoodInfo = { [key: string]: string | boolean | Date };

export interface Food {
  id: string;
  image: string;
  name: string;
  category: Category;
  purchaseDate: string;
  expiredDate: string;
  favorite: boolean;
  space: Space;
  compartmentNum: CompartmentNum;
}

export const initialFoodInfo: Food = {
  id: '0',
  image: '',
  name: '',
  category: '신선식품류',
  purchaseDate: getTodayIsoDateKr(),
  expiredDate: getTodayIsoDateKr(),
  favorite: false,
  space: '냉장실 안쪽',
  compartmentNum: '1번',
};
