type Viewing = '칸별로 보기' | '목록으로 보기';
export type ViewingStep = { step: number; name: Viewing };

export const viewingArr: ViewingStep[] = [
  { step: 1, name: '칸별로 보기' },
  { step: 2, name: '목록으로 보기' },
];
