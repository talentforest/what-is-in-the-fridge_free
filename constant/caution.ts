type CautionLevel = {
  level: 1 | 2 | 3 | 4;
  guide: string;
  max: number;
};

export const caution: CautionLevel[] = [
  {
    level: 1,
    guide: '깔끔해요!',
    max: 2,
  },
  {
    level: 2,
    guide: '유통기한 주의 식료품이 몇가지 있어요.',
    max: 8,
  },
  {
    level: 3,
    guide: '유통기한이 지난 음식부터 정리해보는 건 어떨까요?',
    max: 15,
  },
  {
    level: 4,
    guide: '대청소가 시급해요.',
    max: 10000000,
  },
];

export const getColorByFoodLength = (length: number) => {
  return length >= 15
    ? 'text-red-600'
    : length >= 3
    ? 'text-orange-600'
    : 'text-green-700';
};
