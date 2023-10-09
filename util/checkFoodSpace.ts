import { FoodStorageType, Space } from '../constant/fridgeInfo';

export const isFridgeFood = (space: Space | FoodStorageType) => {
  return (
    space.includes('냉장실') ||
    space.includes('냉동실') ||
    space.includes('냉장고')
  );
};

export const isPantryFood = (space: Space | FoodStorageType) => {
  return space.includes('팬트리');
};
