export type OnboardingStep = { step: number; desc: string; image: string };

export const onboardingSteps: OnboardingStep[] = [
  {
    step: 1,
    desc: '냉장고를 열지 않고, 한눈에 확인하세요.',
    image: 'iphone13pro-1.png',
  },
  {
    step: 2,
    desc: '자주 먹는 식료품들에 대한 목록을 만들고, 장보기 목록에 손쉽게 바로 추가하세요.',
    image: 'iphone13pro-2.png',
  },
  {
    step: 3,
    desc: '유통기한 주의 식료품을 한눈에 파악해, 음식물에 대한 낭비를 줄일 수 있어요.',
    image: 'iphone13pro-3.png',
  },
];
