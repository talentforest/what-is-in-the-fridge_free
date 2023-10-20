import { Space, StorageType } from '../constant/fridgeInfo';

export const isFridgeFood = (space: Space | StorageType) => {
  return (
    space.includes('냉장실') ||
    space.includes('냉동실') ||
    space.includes('냉장고')
  );
};

export const isPantryFood = (space: Space | StorageType) => {
  return space.includes('팬트리');
};
