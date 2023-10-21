import { PlatformIOS } from './statusBarHeight';

export type OnboardingStep = { step: number; desc: string; image: string };

export const onboardingSteps: OnboardingStep[] = [
  {
    step: 1,
    desc: '냉장고를 열지 않고도, 한눈에 식료품을 파악할 수 있어요.',
    image: PlatformIOS ? 'iphone-compartments.png' : 'android-compartments.png',
  },
  {
    step: 2,
    desc: '자주 먹는 식료품 목록을 만들어, 어떤 식료품을 장봐야할지 파악할 수 있어요.',
    image: PlatformIOS
      ? 'iphone-favorite-list.png'
      : 'android-favorite-list.png',
  },
  {
    step: 3,
    desc: '장보기 목록을 쉽게 확인하고, 식료품을 한번에 추가하세요.',
    image: PlatformIOS
      ? 'iphone-shopping-list.png'
      : 'android-shopping-list.png',
  },
  {
    step: 4,
    desc: '우리집 식료품의 상태를 관리하고, 쉽게 확인할 수 있어요.',
    image: PlatformIOS ? 'iphone-food-detail.png' : 'android-food-detail.png',
  },

  {
    step: 5,
    desc: '우리집 냉장고에 맞게 커스텀할 수 있어요.',
    image: PlatformIOS ? 'iphone-my-fridge.png' : 'android-my-fridge.png',
  },
  {
    step: 6,
    desc: '우리집 식료품 관리를 시작해볼까요?',
    image: PlatformIOS ? 'iphone-expired-list.png' : 'android-expired-list.png',
  },
];
