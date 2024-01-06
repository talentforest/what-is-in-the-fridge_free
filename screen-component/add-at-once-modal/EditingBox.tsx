import { Animated, View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { initialFridgeFood } from '../../constant/foodInfo';
import { useDispatch, useSelector } from '../../redux/hook';
import { useFindFood, useItemSlideAnimation } from '../../hooks';
import { setFormFood } from '../../redux/slice/food/formFoodSlice';
import { setCheckedList } from '../../redux/slice/food-list/checkListSlice';

import CategoryItem from '../../components/form/CategoryItem';
import ExpiredDateItem from '../../components/form/ExpiredDateItem';
import tw from 'twrnc';
import Icon from '../../components/common/native-component/Icon';

interface Props {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export default function EditingBox({ isEditing, setIsEditing }: Props) {
  const { formFood } = useSelector((state) => state.formFood);
  const { checkedList } = useSelector((state) => state.checkedList);
  const { isFavoriteItem } = useFindFood();
  const favoriteFood = isFavoriteItem(formFood.name);

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: favoriteFood ? 180 : 256,
    active: isEditing,
  });

  const dispatch = useDispatch();

  const onSubmitPress = () => {
    setIsEditing(false);
    const editedInfo = {
      expiredDate: formFood.expiredDate,
      category: formFood.category,
    };

    const list = checkedList.map((food) => {
      return food.name === formFood.name ? { ...food, ...editedInfo } : food;
    });

    dispatch(setCheckedList(list));
    dispatch(setFormFood(initialFridgeFood));
  };

  return (
    <>
      <View style={tw`my-1 ml-1`}>
        <Text fontSize={15} style={tw`text-green-600 leading-4`}>
          {!!isFavoriteItem(formFood.name)
            ? '자주 먹는 식료품은 소비기한 정보만 변경 가능해요'
            : '소비기한과 카테고리 정보만 변경 가능해요'}
        </Text>
      </View>
      <Animated.View
        style={tw.style('px-2 -mx-2', {
          height,
          overflow: 'hidden',
        })}
      >
        <View
          style={tw.style(
            `p-2.5 pt-0.5 bg-slate-300 border border-slate-200 rounded-xl`
          )}
        >
          <View style={tw`my-1 gap-3`}>
            {/* 카테고리 수정 */}
            {!favoriteFood && <CategoryItem />}

            {/* 소비기한 수정 */}
            <ExpiredDateItem />
          </View>

          <TouchableOpacity
            onPress={onSubmitPress}
            style={tw.style(
              `flex-row justify-center gap-1.5 border border-indigo-300 bg-indigo-500 py-2.5 items-center rounded-full`
            )}
          >
            <Icon name='check' type='Octicons' size={15} color={'#fff'} />
            <Text fontSize={16} style={tw`text-white`}>
              수정 완료
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}
