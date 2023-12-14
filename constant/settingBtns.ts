import { RootStackParamList } from '../navigation/Navigation';

export interface SettingInfo {
  title: string;
  navigate: keyof RootStackParamList | '';
  icon: string;
}

export const settingBtns: SettingInfo[] = [
  {
    title: '나의 냉장고 커스텀',
    icon: 'fridge',
    navigate: 'FridgeSetting',
  },
  { title: '폰트 설정', icon: 'typography', navigate: 'FontSetting' },
  { title: '알림', icon: 'bell', navigate: '' },
  { title: '전체 데이터 초기화', icon: 'skip', navigate: '' },
  { title: '구매 복원', icon: 'history', navigate: '' },
  { title: '버전', icon: 'versions', navigate: '' },
];

export const fridgeSettingBtns: SettingInfo[] = [
  {
    title: '냉장고 외부 설정',
    icon: 'fridge',
    navigate: 'FridgeOutsideSetting',
  },
  {
    title: '냉장고 내부 보기 설정',
    icon: 'eye',
    navigate: 'FridgeInsideSetting',
  },
];
