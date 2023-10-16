import { PlatformIOS } from './statusBarHeight';

export type OnboardingStep = { step: number; desc: string; image: string };

export const onboardingSteps: OnboardingStep[] = [
  {
    step: 1,
    desc: '냉장고를 열지 않고도, 한눈에 식료품을 파악할 수 있어요.',
    image: PlatformIOS ? 'iphone13pro-2.png' : 'android-2.png',
  },
  {
    step: 2,
    desc: '자주 먹는 식료품 목록을 만들어, 어떤 식료품을 장봐야할지 파악할 수 있어요.',
    image: PlatformIOS ? 'iphone13pro-3.png' : 'android-5.png',
  },
  {
    step: 3,
    desc: '장보기 목록을 쉽게 확인하고, 식료품을 한번에 추가하세요.',
    image: PlatformIOS ? 'iphone13pro-6.png' : 'android-6.png',
  },
  {
    step: 4,
    desc: '우리집 식료품의 상태를 관리하고, 쉽게 확인할 수 있어요.',
    image: PlatformIOS ? 'iphone13pro-5.png' : 'android-3.png',
  },

  {
    step: 5,
    desc: '우리집 냉장고에 맞게 커스텀할 수 있어요.',
    image: PlatformIOS ? 'iphone13pro-1.png' : 'android-1.png',
  },
  {
    step: 6,
    desc: '우리집 식료품 관리를 시작해볼까요?',
    image: PlatformIOS ? 'iphone13pro-6.png' : 'android-4.png',
  },
];
