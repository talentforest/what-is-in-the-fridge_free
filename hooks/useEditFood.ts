import { useState } from 'react';
import { useDispatch, useSelector } from '../redux/hook';
import {
  addFridgeFood,
  editFridgeFood,
  removeFridgeFood,
} from '../redux/slice/food-list/fridgeFoodsSlice';
import {
  addToPantry,
  editPantryFood,
  removePantryFood,
} from '../redux/slice/food-list/pantryFoodsSlice';
import {
  addFavorite,
  editFavorite,
  removeFavorite,
} from '../redux/slice/food-list/favoriteFoodsSlice';
import { useFindFood } from './useFindFood';
import {
  checkSameStorage,
  isFridgeFood,
  isPantryFood,
  beforePurchaseDate,
} from '../util';
import { useHandleAlert } from './useHandleAlert';
import { showOpenFoodDetailModal } from '../redux/slice/modalVisibleSlice';
import { Food } from '../constant/foodInfo';
import { search } from '../redux/slice/food/searchedFoodSlice';

export const useEditFood = () => {
  const [editing, setEditing] = useState(false);

  const { isFavorite } = useSelector((state) => state.isFavorite);
  const {
    formFood,
    originFood: {
      name: originName,
      space: originSpace,
      compartmentNum: originCompartmentNum,
    },
  } = useSelector((state) => state.formFood);

  const { isFavoriteItem } = useFindFood();

  const {
    alertWithFood,
    alertNoNameInForm,
    alertWrongDateInForm,
    setAlert, //
  } = useHandleAlert();

  const dispatch = useDispatch();

  const afterChangedPositionAlert = () => {
    const { alertMoveStorage } = alertWithFood(formFood);
    setAlert(alertMoveStorage);
  };

  const handleFavoriteList = (food: Food) => {
    const newName = formFood.name;
    const editedName = newName !== originName;

    if (!editedName) {
      const notChangedFavInfo = isFavorite === !!isFavoriteItem(newName);
      if (!notChangedFavInfo) {
        isFavorite
          ? dispatch(addFavorite(formFood))
          : dispatch(removeFavorite(newName));
      }
    } else {
      if (isFavorite) {
        isFavoriteItem(originName)
          ? dispatch(editFavorite(food)) // 이름을 변경하기 위해.
          : dispatch(addFavorite(formFood));
      } else if (!isFavorite) {
        isFavoriteItem(newName)
          ? dispatch(removeFavorite(newName))
          : dispatch(removeFavorite(originName));
      }
    }
  };

  const handlePostion = (food: Food) => {
    const { space: newSpace, id } = formFood;

    if (checkSameStorage(originSpace, newSpace)) {
      dispatch(
        originSpace === '실온보관'
          ? editPantryFood({ id, food })
          : editFridgeFood({ id, food })
      );
    }

    if (!checkSameStorage(originSpace, newSpace)) {
      if (isPantryFood(newSpace)) {
        dispatch(removeFridgeFood(id));
        dispatch(addToPantry(food));
      }
      if (isFridgeFood(newSpace)) {
        dispatch(removePantryFood(id));
        dispatch(addFridgeFood(food));
      }
    }
  };

  const onEditSumbit = () => {
    const {
      id,
      expiredDate,
      purchaseDate,
      name: newName,
      space: newSpace,
    } = formFood;

    if (newName === '') {
      setAlert(alertNoNameInForm);
      return;
    }
    if (beforePurchaseDate(purchaseDate, expiredDate)) {
      setAlert(alertWrongDateInForm);
      return;
    }

    const editedName = newName !== originName;

    const food = {
      ...formFood,
      id:
        editedName && isFavoriteItem(newName)
          ? isFavoriteItem(newName).id //
          : id,
    };

    handleFavoriteList(food);

    handlePostion(food);

    setEditing(false);

    dispatch(showOpenFoodDetailModal(false));

    const sameSpace = originSpace === newSpace;
    const sameCompartmentNum =
      formFood?.compartmentNum === originCompartmentNum;

    //
    if (sameSpace && !sameCompartmentNum) {
      dispatch(search(newName));
    }
    if (!sameSpace) {
      afterChangedPositionAlert();
    }
  };

  return {
    formFood,
    originName,
    editing,
    setEditing,
    onEditSumbit,
  };
};
