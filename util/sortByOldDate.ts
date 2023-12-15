import { Food } from '../constant/foodInfo';

export const sortByOldDate = (list: Food[]) => {
  const copiedList = list ? [...list] : [];

  const sortedByOldDateList = copiedList.sort(
    (food1, food2) =>
      new Date(food1.expiredDate).getTime() -
      new Date(food2.expiredDate).getTime()
  );
  return sortedByOldDateList || [];
};
