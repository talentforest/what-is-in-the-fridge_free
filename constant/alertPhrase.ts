import { Food } from './foodInfo';
import { CompartmentNum } from './fridgeInfo';

type PhraseObjKey = 'excess' | 'noName' | 'wrongDate' | 'noMemo';

type PhraseFnKey = 'exist' | 'existInList' | 'successAdd' | 'deleteExistFood';

type PhraseWithCheckListKey =
  | 'unSettingFavoriteFoods'
  | 'deleteExpiredFoods'
  | 'deletePantryFoods'
  | 'deleteFromShoppingList'
  | 'addToShoppingList';

type AlertPhraseObj = {
  [key in PhraseObjKey]: {
    title: string;
    msg: string;
  };
};

type AlertPhraseFn = (food: Food) => {
  [key in PhraseFnKey]: {
    title: string;
    msg: string;
  };
};

export const alertPhrase: AlertPhraseObj = {
  excess: {
    title: '식료품 개수 초과 알림',
    msg: '공간당 최대 10개의 식료품을 넣을 수 있습니다.',
  },
  noName: {
    title: '식료품 이름 작성 안내',
    msg: '식료품의 이름이 작성되지 않았어요.',
  },
  wrongDate: {
    title: '날짜 수정 알림',
    msg: '소비기한이 구매일보다 이전일 수 없어요.',
  },
  noMemo: {
    title: '메모 작성 안내',
    msg: '메모가 작성되지 않았어요.',
  },
};

export const alertPhraseWithFood: AlertPhraseFn = (food: Food) => {
  const exist = {
    title: `${food.name}`,
    msg: `${
      food.compartmentNum
        ? `${food.space} ${food.compartmentNum}`
        : `${food.space}`
    }에 이미 식료품이 있어요.`,
  };
  const existInList = {
    title: `${food.name}`,
    msg: '이미 목록에 있어요.',
  };
  const successAdd = {
    title: `${food.name}`,
    msg: '',
  };
  const deleteExistFood = {
    title: `기존 식료품 삭제 안내`,
    msg: `이미 ${food.space}에 ${food.name} 식료품이 존재해요. 기존 식료품을 삭제하고 새로 추가하시겠어요?`,
  };

  return {
    exist,
    existInList,
    successAdd,
    deleteExistFood,
  };
};

export const alertPhraseDeleteCompartment: (compartmentNum: CompartmentNum) => {
  title: string;
  msg: string;
} = (compartmentNum: CompartmentNum) => {
  return {
    title: '식료품 존재 안내',
    msg: `${compartmentNum}번 칸에 식료품이 있어 삭제할 수 없어요.`,
  };
};

export const alertPhraseWithCheckList: (food: Food[]) => {
  [key in PhraseWithCheckListKey]: {
    title: string;
    msg: string;
  };
} = (checkedList: Food[]) => {
  const checkedFoodNameList = checkedList.map((food) => food.name).join(', ');

  const unSettingFavoriteFoods = {
    title: '자주 먹는 식료품 해제',
    msg: `총 ${checkedList.length}개의 식료품(${checkedFoodNameList})을 자주 먹는 식료품에서 해제하시겠어요?`,
  };
  const deleteExpiredFoods = {
    title: '소비기한 주의 식료품 삭제',
    msg: `총 ${checkedList.length}개의 식료품(${checkedFoodNameList})을 삭제하시겠어요? 냉장고나 팬트리에서도 삭제돼요.`,
  };
  const deletePantryFoods = {
    title: '팬트리 식료품 삭제',
    msg: `총 ${checkedList.length}개의 식료품(${checkedFoodNameList})을 팬트리 목록에서 삭제하시겠어요?`,
  };
  const deleteFromShoppingList = {
    title: '장보기 식료품 삭제',
    msg: `총 ${checkedList.length}개의 식료품(${checkedFoodNameList})을 장보기 목록에서 삭제하시겠어요?`,
  };
  const addToShoppingList = {
    title: '장보기 목록 추가',
    msg: `총 ${checkedList.length}개의 식료품(${checkedFoodNameList})이 장보기 목록에 추가되었어요. 바로 장보기 목록으로 이동하시겠어요?`,
  };

  return {
    unSettingFavoriteFoods,
    deleteExpiredFoods,
    deletePantryFoods,
    deleteFromShoppingList,
    addToShoppingList,
  };
};
