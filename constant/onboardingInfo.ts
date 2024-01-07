export type OnboardingStep = { step: number; desc: string; image: string };

export const onboardingSteps: OnboardingStep[] = [
  {
    step: 1,
    desc: '우리집 냉장고에 맞게, 커스텀할 수 있어요',
    image: 'android-setting-fridge.png',
  },
  {
    step: 2,
    desc: '냉장고를 열지 않고, 칸별로 식료품들을 한눈에 파악해요',
    image: 'android-compartments.png',
  },
  {
    step: 3,
    desc: '장보기 목록을 손쉽게 작성하고, 식료품들을 냉장고에 한번에 추가해요',
    image: 'android-shopping-list.png',
  },
  {
    step: 4,
    desc: '자주 먹는 식료품 중에 없는 식료품은, 장보기 목록에 바로 추가해요',
    image: 'android-favorite-list.png',
  },
  {
    step: 5,
    desc: '우리집 냉장고에 뭐가 있는지 고민하지 마세요., 그럼 우리집 식료품 관리를 시작해볼까요?',
    image: 'android-all-foods.png',
  },
];
