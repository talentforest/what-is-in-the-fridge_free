export type BtnTitle = '장보기 목록' | '소비기한 주의' | '자주 먹는 식료품';
export type BtnAssetName = 'expired-foods' | 'favorite-foods' | 'shoppinglist';
export type navigationName = 'ExpiredFoods' | 'FavoriteFoods' | 'ShoppingList';

export interface NavigationBtns {
  title: BtnTitle;
  assetName: BtnAssetName;
  navigationName: navigationName;
  color: 'gray' | 'indigo' | 'blue';
}

export const navigationBtns: NavigationBtns[] = [
  {
    title: '소비기한 주의',
    assetName: 'expired-foods',
    navigationName: 'ExpiredFoods',
    color: 'gray',
  },
  {
    title: '자주 먹는 식료품',
    assetName: 'favorite-foods',
    navigationName: 'FavoriteFoods',
    color: 'indigo',
  },
  {
    title: '장보기 목록',
    assetName: 'shoppinglist',
    navigationName: 'ShoppingList',
    color: 'blue',
  },
];
