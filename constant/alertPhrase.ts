import { Food, MAX_LIMIT } from './foodInfo';
import { CompartmentNum, Space } from './fridgeInfo';

type PhraseObjKey =
  | 'excessTotal'
  | 'excessToAddAtOnce'
  | 'noName'
  | 'wrongDate'
  | 'alreadyExist';

type PhraseFnKey = 'exist' | 'successAdd' | 'modifyCategory' | 'moveStorage';

type PhraseWithCheckListKey =
  | 'unSettingFavoriteFoods'
  | 'deleteExpiredFoods'
  | 'deleteFromShoppingList'
  | 'addToShoppingList'
  | 'confirmAddAll';

export type AlertPhraseObj = {
  [key in PhraseObjKey]: {
    title: string;
    msg: string;
  };
};

export type AlertObj = {
  title: string;
  msg: string;
};

type AlertPhraseFn = (food: Food) => {
  [key in PhraseFnKey]: AlertObj;
};

export const MAX_NUM_ADD_AT_ONCE = 8;

export const alertPhrase: AlertPhraseObj = {
  excessTotal: {
    title: '식료품 개수 한도 도달',
    msg: `냉장고와 팬트리, 총합 식료품 개수 한도인 ${MAX_LIMIT}개에 도달했습니다.`,
  },
  excessToAddAtOnce: {
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
  alreadyExist: {
    title: '이미 갖고 있는 식료품',
    msg: '이미 냉장고나 팬트리에 있는 식료품은 추가할 수 없어요. 갖고 계신 식료품은 선택을 해제해주세요.',
  },
};

export const alertPhraseWithFood: AlertPhraseFn = (food: Food) => {
  const { space, compartmentNum, name, category } = food;

  const position =
    space === '팬트리' ? `${space}` : `${space} ${compartmentNum}칸`;

  const exist = {
    title: '이미 갖고 있는 식료품',
    msg: `'${name}' 식료품은 이미 ${position}에 있어요.`,
  };

  const successAdd = {
    title: '식료품 추가 완료',
    msg: `${name} 식료품이 ${position}에 추가되었어요.`,
  };
  const modifyCategory = {
    title: '카테고리 변경 알림',
    msg: `${space}에 있는 동일한 식료품은 "${category}" 카테고리로 저장되어 있어요. 기존에 갖고 계신 정보로 저장돼요.`,
  };

  const moveStorage = {
    title: '식료품 이동 알림',
    msg: `${name}의 위치가 ${position}으로 이동되었어요.`,
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
    title: '자주 먹는 식료품 삭제',
    msg: `총 ${listLength}개의 식료품(${nameList})을 자주 먹는 식료품에서 삭제하시겠어요?`,
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
