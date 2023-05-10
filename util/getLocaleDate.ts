export function getLocaleDate(date: string) {
  return new Date(date).toLocaleDateString('ko');
}
