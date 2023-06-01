type CautionLevel = {
  level: 1 | 2 | 3 | 4;
  guide: string;
  max: number;
};

export const caution: CautionLevel[] = [
  {
    level: 1,
    guide: '냉장고가 깔끔해요!',
    max: 3,
  },
  {
    level: 2,
    guide: '조금만 정리하면 냉장고가 깔끔해질 것 같아요.',
    max: 8,
  },
  {
    level: 3,
    guide: '차근차근 유통기한이 지난 음식부터 처리해보는 건 어떨까요?',
    max: 15,
  },
  {
    level: 4,
    guide: '냉장고 대청소가 시급해요.',
    max: 10000000,
  },
];
