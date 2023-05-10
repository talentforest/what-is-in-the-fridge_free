export function deduplicate<T extends { name: string }>(array: T[]) {
  const deduplicatedArr = array.filter(
    (arr, idx, callback) =>
      idx === callback.findIndex((ele) => ele.name === arr.name)
  );

  return deduplicatedArr;
}
