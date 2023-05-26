import { foodCategories } from '../constant/foodCategories';

export const getCategory = (prdkind: string) => {
  return foodCategories.find((category) => {
    if (prdkind) return category.prdkind.includes(prdkind);
  })?.category;
};
