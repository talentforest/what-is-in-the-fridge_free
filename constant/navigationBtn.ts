export type BtnTitle = '장보기 목록' | '소비기한 주의' | '자주 먹는 식료품';
export type BtnAssetName = 'expired-foods' | 'favorite-foods' | 'shoppinglist';
export type navigationName = 'ExpiredFoods' | 'FavoriteFoods' | 'ShoppingList';

interface NavigationBtns {
  title: BtnTitle;
  assetName: BtnAssetName;
  navigationName: navigationName;
}

export const navigationBtns: NavigationBtns[] = [
  {
    title: '소비기한 주의',
    assetName: 'expired-foods',
    navigationName: 'ExpiredFoods',
  },
  {
    title: '자주 먹는 식료품',
    assetName: 'favorite-foods',
    navigationName: 'FavoriteFoods',
  },
  {
    title: '장보기 목록',
    assetName: 'shoppinglist',
    navigationName: 'ShoppingList',
  },
];
