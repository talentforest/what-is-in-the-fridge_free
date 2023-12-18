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
    navigate: 'SettingFridge',
  },
  { title: '폰트', icon: 'typography', navigate: 'SettingFont' },
  { title: '알림', icon: 'bell', navigate: 'SettingNotification' },
  { title: '전체 데이터 초기화', icon: 'skip', navigate: '' },
  { title: '구매 복원', icon: 'history', navigate: '' },
  { title: '버전', icon: 'versions', navigate: '' },
];
