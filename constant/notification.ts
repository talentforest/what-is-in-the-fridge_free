export const NOTIFICATION_CHANNEL_ID = '소비기한 주의 식료품 알림';

export const notificationContents = [
  {
    id: '소비기한 만료',
    title: '소비기한 만료 식료품 안내 ⌛️',
    body: `의 소비기한이 지났어요. 해당 식료품은 냉장고에서 정리해요.`,
  },
  {
    id: '소비기한 임박',
    title: '소비기한 임박 식료품 안내 ⏳',
    body: `의 소비기한이 얼마 남지 않았어요. 해당 식료품부터 섭취해요.`,
  },
  {
    id: '소비기한 주의',
    title: '소비기한 주의 식료품 안내 ⏳',
    body: `의 소비기한이 지났거나 얼마 남지 않았어요. 냉장고를 확인해보세요.`,
  },
];
