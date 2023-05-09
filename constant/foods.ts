import { Category } from './foodCategories';
import { CompartmentNum, Space } from './fridge';

export type FoodInfo = { [key: string]: string | boolean | Date };

export interface Food {
  id: string;
  image: string;
  name: string;
  category: Category;
  quantity: string;
  purchaseDate: string;
  expirationDate: string;
  favorite: boolean;
  space: Space;
  compartmentNum: CompartmentNum;
}

export const initialFoodInfo: Food = {
  id: '0',
  image: '',
  name: '',
  category: '채소' as Category,
  quantity: '0',
  purchaseDate: new Date().toISOString().slice(0, 10),
  expirationDate: new Date().toISOString().slice(0, 10),
  favorite: false,
  space: '냉장실 안쪽',
  compartmentNum: '1번',
};
