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

export const examplePantryFoods: Food[] = [
  {
    id: 'pantryFood_1',
    name: '소면',
    category: '간편/즉석식품류',
    purchaseDate: '',
    expiredDate: getFormattedDate(new Date(), 'YYYY-MM-DD'),
    space: '팬트리',
    quantity: '',
    memo: '',
  },
  {
    id: 'pantryFood_2',
    name: '삼계탕',
    category: '국/반찬류',
    purchaseDate: '2023-04-02',
    expiredDate: getFormattedDate(new Date(), 'YYYY-MM-DD'),
    space: '팬트리',
    quantity: '2',
    memo: '',
  },
];

export const exampleFridgeFoods: Food[] = [
  {
    id: 'fridge1',
    name: '사과',
    category: '신선식품류',
    purchaseDate: '2023-10-31',
    expiredDate: '2023-12-20',
    space: '냉장실 안쪽',
    compartmentNum: '1번',
    quantity: '6',
    memo: '',
  },
  {
    id: 'freezer1',
    name: '식빵',
    category: '베이커리/잼',
    purchaseDate: '',
    expiredDate: '2022-12-20',
    space: '냉동실 안쪽',
    compartmentNum: '1번',
    quantity: '',
    memo: '',
  },
];

export const MAX_LIMIT = 30;

export const NAME_MAX_LENGTH = 30;
