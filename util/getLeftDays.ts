export const today = new Date().toISOString().slice(0, 10);

export function getLeftDays(expiryDate: string) {
  const diffDate = new Date(expiryDate).getTime() - new Date(today).getTime();
  const leftDays = diffDate / (1000 * 60 * 60 * 24);
  return leftDays;
}
