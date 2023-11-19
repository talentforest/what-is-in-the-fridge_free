import { FoodPosition } from '../constant/fridgeInfo';

export const getCompartments = (numOfItems: number) => {
  return Array.from({ length: numOfItems }, (_, index) => {
    const compartmentNum = `${index + 1}번`;
    return { compartmentNum } as FoodPosition;
  });
};
