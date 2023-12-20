import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../navigation/Navigation';
import { useDispatch, useSelector } from '../redux/hook';
import { Food, MAX_LIMIT, initialFridgeFood } from '../constant/foodInfo';
import { CompartmentNum } from '../constant/fridgeInfo';
import {
  AlertBtnName,
  AlertTitle,
  alert,
  toggleAlertModal,
} from '../redux/slice/alertModalSlice';
import { setCheckedList } from '../redux/slice/food-list/checkListSlice';
import { setAfterAnimation } from '../redux/slice/afterAnimationSlice';
import {
  addItemsToShoppingList,
  removeShoppingListFoods,
  setShoppingList,
} from '../redux/slice/food-list/shoppingListSlice';
import {
  addPantryFoods,
  setAllPantryFoods,
} from '../redux/slice/food-list/pantryFoodsSlice';
import {
  addFridgeFoods,
  setAllFridgeFoods,
} from '../redux/slice/food-list/fridgeFoodsSlice';
import { showAddAtOnceModal } from '../redux/slice/modalVisibleSlice';
import { search } from '../redux/slice/food/searchedFoodSlice';
import { setFavoriteList } from '../redux/slice/food-list/favoriteFoodsSlice';

export type AlertBtns = {
  name: AlertBtnName;
  fn: () => void;
};

export type AlertObj = {
  title: AlertTitle;
  msg: string;
  btns: AlertBtns[];
};
type AlertObjFunction = (compartmentNum: CompartmentNum) => AlertObj;
type AlertDoubleObjFunction = (food: Food) => {
  [key in string]: AlertObj;
};

export const MAX_NUM_ADD_AT_ONCE = 8;

export const useHandleAlert = () => {
  const { checkedList } = useSelector((state) => state.checkedList);
  const { formFood } = useSelector((state) => state.formFood);

  const dispatch = useDispatch();

  const navigation = useNavigation<NavigateProp>();

  // alert 버튼을 누르면 호출되는 함수들
  const closeAlertModal = () => dispatch(toggleAlertModal(false));

  const goSettingScreen = () => {
    closeAlertModal();
    return navigation.navigate('Setting');
  };

  const onDeleteBtnPress = () => {
    dispatch(setAfterAnimation('slideup-out'));
    closeAlertModal();
    return;
  };

  const onAddShoppingListBtnPress = () => {
    dispatch(addItemsToShoppingList(checkedList));
    dispatch(setCheckedList([]));
    closeAlertModal();
    return;
  };

  const onAddAtOncePress = (foodPosition: string) => {
    dispatch(
      foodPosition === '실온보관'
        ? addPantryFoods(checkedList)
        : addFridgeFoods(checkedList)
    );
    dispatch(removeShoppingListFoods(checkedList));
    closeAlertModal();
    dispatch(showAddAtOnceModal(false));
    dispatch(setCheckedList([]));

    const { alertSuccessAddAllFoods } = alertWithCheckList();
    setAlert(alertSuccessAddAllFoods);
    return;
  };

  const goChangedPosition = () => {
    // 공간이 변경된 경우 이동하는 경우에만 search 세팅 후 navigation 이동
    const { space, name } = formFood;
    dispatch(search(name));
    space === '실온보관'
      ? navigation.navigate('PantryFoods')
      : navigation.navigate('Compartments', { space });
    closeAlertModal();
  };

  const onResetDataPress = async () => {
    dispatch(setAllFridgeFoods([]));
    dispatch(setAllPantryFoods([]));
    dispatch(setFavoriteList([]));
    dispatch(setShoppingList([]));
    setAlert(alertDoneInitializeData);
  };

  // Alert
  const alertReachedLimit: AlertObj = {
    title: '식료품 개수 한도 도달',
    msg: `식료품 저장 최대 한도인 ${MAX_LIMIT}개에 도달했어요. 한번만 결제하면 식료품을 한도 없이 저장할 수 있는 이용권을 구매하러 가볼까요?.`,
    btns: [
      { name: '닫기', fn: closeAlertModal },
      { name: '이용권 구매하러 가기', fn: goSettingScreen },
    ],
  };

  const alertChangeFont: AlertObj = {
    title: '폰트 변경 완료',
    msg: `폰트가 변경되었어요!`,
    btns: [{ name: '확인', fn: closeAlertModal }],
  };

  const alertAddAtOnceLimit: AlertObj = {
    title: '한번에 추가할 식료품 개수 초과',
    msg: `최대 ${MAX_NUM_ADD_AT_ONCE}개까지 한 공간에 한번에 추가할 수 있어요.`,
    btns: [{ name: '확인', fn: closeAlertModal }],
  };

  const alertAlreadyHasFood: AlertObj = {
    title: '이미 갖고 있는 식료품',
    msg: '이미 냉장고나 실온보관에 있는 식료품은 추가할 수 없어요. 갖고 계신 식료품은 선택을 해제해주세요.',
    btns: [{ name: '확인', fn: closeAlertModal }],
  };

  const alertNoNameInForm: AlertObj = {
    title: '식료품 이름 미작성',
    msg: '식료품의 이름이 작성되지 않았어요.',
    btns: [{ name: '확인', fn: closeAlertModal }],
  };

  const alertWrongDateInForm: AlertObj = {
    title: '유효하지 않은 소비기한',
    msg: '소비기한은 구매일 이후여야 해요.',
    btns: [{ name: '확인', fn: closeAlertModal }],
  };

  const alertIAP: AlertObj = {
    title: '이용권 구매 오류',
    msg: '이용권을 구매하는 과정에서 오류가 발생했습니다. 조금 있다가 다시 한번 시도해주세요.',
    btns: [{ name: '확인', fn: closeAlertModal }],
  };

  const alertFailRestoreIAP: AlertObj = {
    title: '이용권 복원 실패',
    msg: '복원 가능한 이용권이 없습니다.',
    btns: [{ name: '확인', fn: closeAlertModal }],
  };

  const alertSucessRestoreIAP: AlertObj = {
    title: '이용권 복원 성공',
    msg: '성공적으로 인앱 상품을 복원했어요. 이제 무제한으로 식료품을 저장할 수 있어요.',
    btns: [{ name: '확인', fn: closeAlertModal }],
  };

  const alertHasReceipt: AlertObj = {
    title: '이용권 이용중 안내',
    msg: '이미 무제한 저장 이용권을 이용중이에요.',
    btns: [{ name: '확인', fn: closeAlertModal }],
  };

  const alertInitializeData: AlertObj = {
    title: '식료품 데이터 초기화',
    msg: '모든 식료품 관련 데이터를 삭제하시겠습니까?',
    btns: [
      { name: '취소', fn: closeAlertModal },
      { name: '확인', fn: onResetDataPress },
    ],
  };

  const alertDoneInitializeData: AlertObj = {
    title: '데이터 초기화 완료',
    msg: `모든 식료품 데이터가 초기화되었습니다.`,
    btns: [{ name: '닫기', fn: closeAlertModal }],
  };

  //  Alert With CompartmentNum
  const alertDeleteCompartment: AlertObjFunction = (
    compartmentNum: CompartmentNum
  ) => {
    return {
      title: '식료품 존재 안내',
      msg: `${compartmentNum}칸에 식료품이 있어요.`,
      btns: [{ name: '확인', fn: closeAlertModal }],
    };
  };

  const getFoodPosition = (food: Food) => {
    if (food?.space) {
      const { space, compartmentNum } = food;
      return space === '실온보관' ? `${space}` : `${space} ${compartmentNum}칸`;
    }
    return '공간';
  };

  //  Alert With Food Info
  const alertWithFood: AlertDoubleObjFunction = (food: Food) => {
    const { name, category } = food;

    const position = getFoodPosition(food);

    const alertFoodPosition: AlertObj = {
      title: '이미 갖고 있는 식료품',
      msg: `"${name}" 식료품은 이미 ${position}에 있어요.`,
      btns: [{ name: '확인', fn: closeAlertModal }],
    };

    const alertSuccessAddFood: AlertObj = {
      title: '식료품 추가 완료',
      msg: `${name} 식료품이 ${position}에 추가되었어요.`,
      btns: [{ name: '확인', fn: closeAlertModal }],
    };

    const alertChangeCategory: AlertObj = {
      title: '카테고리 변경 알림',
      msg: `${position}에 있는 동일한 식료품은 "${category}" 카테고리로 저장되어 있어요. 기존에 저장된 카테고리로 추가되었어요.`,
      btns: [{ name: '확인', fn: closeAlertModal }],
    };

    const alertMoveStorage: AlertObj = {
      title: '식료품 이동 알림',
      msg: `${name}의 위치가 ${position}으로 이동되었어요.`,
      btns: [
        { name: '닫기', fn: closeAlertModal },
        { name: '바로 이동하기', fn: goChangedPosition },
      ],
    };

    return {
      alertFoodPosition,
      alertSuccessAddFood,
      alertChangeCategory,
      alertMoveStorage,
    };
  };

  // Alert With CheckList Info
  const alertWithCheckList = () => {
    const listLength = checkedList.length;

    const food = checkedList[0];

    const foodPosition = getFoodPosition(food);

    const alertSuccessAddAllFoods: AlertObj = {
      title: '모든 식료품 추가 완료',
      msg: `${foodPosition}에 성공적으로 추가되었습니다.`,
      btns: [{ name: '확인', fn: closeAlertModal }],
    };

    const alertConfirmAddAll: AlertObj = {
      title: '식료품 한번에 추가',
      msg: `총 ${listLength}개의 식료품을 ${foodPosition}에 한번에 추가하시겠어요?`,
      btns: [
        { name: '취소', fn: closeAlertModal },
        {
          name: '한번에 추가',
          fn: () => {
            onAddAtOncePress(foodPosition);
          },
        },
      ],
    };

    const namesStr = `${checkedList
      .map((food) => food.name)
      .slice(0, 8)
      .join(', ')}${listLength > 8 ? ' 등...' : ''}`;

    const alertDeleteFavoriteFoods: AlertObj = {
      title: '자주 먹는 식료품 삭제',
      msg: `총 ${listLength}개의 식료품(${namesStr})을 자주 먹는 식료품에서 삭제하시겠어요?`,
      btns: [
        { name: '취소', fn: closeAlertModal },
        { name: '삭제', fn: onDeleteBtnPress },
      ],
    };

    const alertDeleteExpiredFoods: AlertObj = {
      title: '소비기한 주의 식료품 삭제',
      msg: `총 ${listLength}개의 식료품(${namesStr})을 삭제하시겠어요? 냉장고나 실온보관 공간에서도 삭제돼요.`,
      btns: [
        { name: '취소', fn: closeAlertModal },
        { name: '삭제', fn: onDeleteBtnPress },
      ],
    };

    const alertDeleteFromShoppingList: AlertObj = {
      title: '장보기 식료품 삭제',
      msg: `총 ${listLength}개의 식료품(${namesStr})을 장보기 목록에서 삭제하시겠어요?`,
      btns: [
        { name: '취소', fn: closeAlertModal },
        { name: '삭제', fn: onDeleteBtnPress },
      ],
    };

    const alertAddToShoppingList: AlertObj = {
      title: '장보기 목록 추가',
      msg: `총 ${listLength}개의 식료품(${namesStr})을 장보기 목록에 추가합니다.`,
      btns: [
        { name: '취소', fn: closeAlertModal },
        { name: '확인', fn: onAddShoppingListBtnPress },
      ],
    };

    return {
      alertSuccessAddAllFoods,
      alertConfirmAddAll,
      alertDeleteFavoriteFoods,
      alertDeleteExpiredFoods,
      alertDeleteFromShoppingList,
      alertAddToShoppingList,
    };
  };

  // 위에서 정의한 Alert객체들을 모두 여기에 모아두기
  const getAllAlertsArr = () => {
    const alertDeleteCompartmentObj = alertDeleteCompartment('1번');

    const {
      alertFoodPosition,
      alertSuccessAddFood,
      alertChangeCategory,
      alertMoveStorage,
    } = alertWithFood(initialFridgeFood);

    const {
      alertSuccessAddAllFoods,
      alertConfirmAddAll,
      alertDeleteFavoriteFoods,
      alertDeleteExpiredFoods,
      alertDeleteFromShoppingList,
      alertAddToShoppingList,
    } = alertWithCheckList();

    const alerts: AlertObj[] = [
      alertReachedLimit,
      alertAddAtOnceLimit,
      alertAlreadyHasFood,
      alertNoNameInForm,
      alertWrongDateInForm,
      alertChangeFont,
      alertIAP,
      alertFailRestoreIAP,
      alertSucessRestoreIAP,
      alertHasReceipt,
      alertInitializeData,
      alertDoneInitializeData,

      // compartmentNum
      alertDeleteCompartmentObj,
      // food
      alertFoodPosition,
      alertSuccessAddFood,
      alertChangeCategory,
      alertMoveStorage,
      // checkedList
      alertSuccessAddAllFoods,
      alertConfirmAddAll,
      alertDeleteFavoriteFoods,
      alertDeleteExpiredFoods,
      alertDeleteFromShoppingList,
      alertAddToShoppingList,
    ];

    return alerts;
  };

  // alert 모달에 있는 버튼을 눌렀을 때
  const onAlertBtnPress = (title: AlertTitle, btnName: AlertBtnName) => {
    const alerts = getAllAlertsArr();
    const findAlert = alerts.find((alert) => alert.title === title);
    const findBtn = findAlert.btns.find((btn) => btn.name === btnName);

    findBtn.fn();
  };

  const setAlert = (obj: AlertObj) => {
    const info = { ...obj, btns: obj.btns.map((btn) => btn.name) };
    return dispatch(alert(info));
  };

  return {
    alertReachedLimit,
    alertAddAtOnceLimit,
    alertAlreadyHasFood,
    alertNoNameInForm,
    alertWrongDateInForm,
    alertChangeFont,
    alertIAP,
    alertFailRestoreIAP,
    alertSucessRestoreIAP,
    alertHasReceipt,
    alertInitializeData,
    alertDoneInitializeData,

    alertDeleteCompartment,
    alertWithFood,
    alertWithCheckList,

    setAlert,
    onAlertBtnPress,
    closeAlertModal,
  };
};
