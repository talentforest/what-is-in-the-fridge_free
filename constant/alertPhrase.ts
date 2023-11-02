import { Food } from './foodInfo';
import { CompartmentNum, Space } from './fridgeInfo';

type PhraseObjKey =
  | 'excess'
  | 'noName'
  | 'wrongDate'
  | 'noMemo'
  | 'alreadyExist';

type PhraseFnKey = 'exist' | 'successAdd' | 'modifyCategory' | 'moveStorage';

type PhraseWithCheckListKey =
  | 'unSettingFavoriteFoods'
  | 'deleteExpiredFoods'
  | 'deleteFromShoppingList'
  | 'addToShoppingList'
  | 'confirmAddAll';

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

export const MAX_NUM_ADD_AT_ONCE = 8;

export const alertPhrase: AlertPhraseObj = {
  excess: {
    title: '식료품 개수 초과',
    msg: `최대 ${MAX_NUM_ADD_AT_ONCE}개까지 한번에 추가할 수 있어요.`,
  },
  noName: {
    title: '식료품 이름 미작성',
    msg: '식료품의 이름이 작성되지 않았어요.',
  },
  wrongDate: {
    title: '유효하지 않은 소비기한',
    msg: '소비기한은 구매일 이후여야 해요.',
  },
  noMemo: {
    title: '메모 미작성',
    msg: '메모가 작성되지 않았어요. 작성하지 않는다면 생략하기 버튼을 눌러주세요.',
  },
  alreadyExist: {
    title: '이미 존재하는 식료품 알림',
    msg: '이미 냉장고나 팬트리에 있는 식료품은 추가할 수 없어요. 갖고 계신 식료품은 선택을 해제해주세요.',
  },
};

export const alertPhraseWithFood: AlertPhraseFn = (food: Food) => {
  const exist = {
    title: '이미 존재하는 식료품 알림',
    msg: `${food.name} 식료품은 이미 ${
      food.space === '팬트리'
        ? `${food.space}`
        : `${food.space} ${food.compartmentNum}`
    }에 있어요.`,
  };
  const successAdd = {
    title: '식료품 추가 완료',
    msg: '',
  };
  const modifyCategory = {
    title: '카테고리 변경 알림',
    msg: `${food.space}에 있는 동일한 식료품은 "${food.category}" 카테고리로 저장되어 있어요. 기존에 갖고 계신 정보로 저장돼요.`,
  };

  const moveStorage = {
    title: '식료품 이동 알림',
    msg: `${food.name}의 위치가 ${food.space}으로 이동되었어요.`,
  };

  return {
    exist,
    successAdd,
    modifyCategory,
    moveStorage,
  };
};

export const alertPhraseDeleteCompartment: (compartmentNum: CompartmentNum) => {
  title: string;
  msg: string;
} = (compartmentNum: CompartmentNum) => {
  return {
    title: '식료품 존재 안내',
    msg: `${compartmentNum}칸에 식료품이 있어요.`,
  };
};

const convertNameList = (list: Food[]) =>
  list.map((food) => food.name).join(', ');

const getNameList = (list: Food[]) => {
  const nameList = convertNameList(list.slice(0, 8));
  return list.length > 8 ? `${nameList} 등...` : nameList;
};

const getPosition = (space: Space, compartmentNum?: CompartmentNum) => {
  return compartmentNum && space !== '팬트리'
    ? `${space} ${compartmentNum}칸`
    : space;
};

export const alertPhraseWithCheckList: (food: Food[]) => {
  [key in PhraseWithCheckListKey]: {
    title: string;
    msg: string;
  };
} = (checkedList: Food[]) => {
  const nameList = getNameList(checkedList);
  const listLength = checkedList.length;

  const unSettingFavoriteFoods = {
    title: '자주 먹는 식료품 해제',
    msg: `총 ${listLength}개의 식료품(${nameList})을 자주 먹는 식료품에서 해제하시겠어요?`,
  };

  const deleteExpiredFoods = {
    title: '소비기한 주의 식료품 삭제',
    msg: `총 ${listLength}개의 식료품(${nameList})을 삭제하시겠어요? 냉장고나 팬트리 공간에서도 삭제돼요.`,
  };

  const deleteFromShoppingList = {
    title: '장보기 식료품 삭제',
    msg: `총 ${listLength}개의 식료품(${nameList})을 장보기 목록에서 삭제하시겠어요?`,
  };

  const addToShoppingList = {
    title: '장보기 목록 추가',
    msg: `총 ${listLength}개의 식료품(${nameList})이 장보기 목록에 추가되었어요.`,
  };

  const confirmAddAll = {
    title: '식료품 한번에 추가',
    msg: `총 ${listLength}개의 식료품을 ${getPosition(
      checkedList[0]?.space,
      checkedList[0]?.compartmentNum
    )}에 추가하시겠어요?`,
  };

  return {
    unSettingFavoriteFoods,
    deleteExpiredFoods,
    deleteFromShoppingList,
    addToShoppingList,
    confirmAddAll,
  };
};
