import { PlatformIOS } from './statusBarHeight';

export type OnboardingStep = { step: number; desc: string; image: string };

export const onboardingSteps: OnboardingStep[] = [
  {
    step: 1,
    desc: '우리집에 맞게, 냉장고를 커스텀할 수 있어요.',
    image: 'android-my-fridge.png',
  },
  {
    step: 2,
    desc: '냉장고를 열지 않고도, 칸별로 식료품들을 한눈에 파악해요.',
    image: 'android-compartments.png',
  },
  {
    step: 3,
    desc: '우리집 식료품의 상태를 관리하고, 쉽게 확인할 수 있어요.',
    image: 'android-food-detail.png',
  },
  {
    step: 4,
    desc: '소비기한 주의 식료품 목록을 통해, 어떤 식료품을 먼저 섭취해야 할지 확인해요.',
    image: 'android-expired-list.png',
  },
  {
    step: 5,
    desc: '장보기 목록을 손쉽게 작성하고, 식료품들을 칸별로 한번에 추가해요.',
    image: 'android-shopping-list.png',
  },
  {
    step: 6,
    desc: '자주 먹는 식료품 목록을 통해 어떤 식료품을, 장보기 목록에 넣어야 할지 파악해요.',
    image: 'android-favorite-list.png',
  },

  {
    step: 7,
    desc: '우리집 냉장고에 뭐가 있는지 고민하지 마세요., 그럼 우리집 식료품 관리를 시작해볼까요?',
    image: 'android-expired-list.png',
  },
];
