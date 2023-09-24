export const debounce = <Func extends (...args: any[]) => any>(
  func: Func,
  delay: number
): ((...args: Parameters<Func>) => void) => {
  let timeoutId: NodeJS.Timeout | null;

  return (...args: Parameters<Func>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
