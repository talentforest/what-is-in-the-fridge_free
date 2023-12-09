import { RootStackParamList } from '../navigation/Navigation';

export interface SettingInfo {
  title: string;
  navigate: keyof RootStackParamList | '';
  icon: string;
}

export const settingBtns: SettingInfo[] = [
  {
    title: '나의 냉장고 커스텀',
    icon: 'fridge-outline',
    navigate: 'FridgeSetting',
  },
  { title: '폰트 설정', icon: 'typography', navigate: 'FontSetting' },
  { title: '알림', icon: 'bell', navigate: '' },
  { title: '복원', icon: 'history', navigate: '' },
  { title: '버전', icon: 'versions', navigate: '' },
];
