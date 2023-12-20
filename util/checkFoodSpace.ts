import { Space, StorageType } from '../constant/fridgeInfo';

export const isFridgeFood = (space: Space | StorageType) => {
  return (
    space.includes('냉장실') ||
    space.includes('냉동실') ||
    space.includes('냉장고')
  );
};

export const isPantryFood = (space: Space | StorageType) => {
  return space.includes('실온보관');
};

export const checkSameStorage = (originSpace: Space, newSpace: Space) => {
  const sameFridge = isFridgeFood(originSpace) && isFridgeFood(newSpace);
  const samePantry = !isFridgeFood(originSpace) && !isFridgeFood(newSpace);
  return samePantry || sameFridge;
};
