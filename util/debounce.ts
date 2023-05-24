import { ProductType } from '../components/modal/add-food-modal.tsx/Product';

export const debounce = (searchKeyword: string, delay: number) => {
  let inProgress = false;
  return () => {
    if (inProgress) return;
    inProgress = true;
    setTimeout(() => {
      inProgress = false;
      return searchKeyword;
    }, delay);
  };
};
