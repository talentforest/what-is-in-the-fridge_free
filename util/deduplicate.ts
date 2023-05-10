import { Food } from '../constant/foods';

export function deduplicate(array: Food[]) {
  const deduplicatedArr = array.filter(
    (arr, idx, callback) =>
      idx === callback.findIndex((ele) => ele.name === arr.name)
  );

  return deduplicatedArr;
}
