import { Food } from '../constant/foods';

export function deduplicate(array: Food[], key: keyof Food) {
  const deduplicatedArr = array.filter(
    (arr, idx, callback) =>
      idx === callback.findIndex((ele) => ele[key] === arr[key])
  );

  return deduplicatedArr;
}
