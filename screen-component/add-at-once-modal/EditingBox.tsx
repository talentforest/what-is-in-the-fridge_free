import { Animated, View } from 'react-native';
import { shadowStyle } from '../../constant/shadowStyle';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { Food } from '../../constant/foodInfo';
import { useDispatch, useSelector } from '../../redux/hook';
import { select, selectNone } from '../../redux/slice/selectedFoodSlice';
import { useFindFood, useSlideAnimation } from '../../hooks';

import CategoryItem from '../../components/form/CategoryItem';
import ExpiredDateItem from '../../components/form/ExpiredDateItem';
import FormMessage from '../../components/form/FormMessage';
import tw from 'twrnc';

interface Props {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setCheckedList: React.Dispatch<React.SetStateAction<Food[]>>;
}

export default function EditingBox({
  isEditing,
  setIsEditing,
  setCheckedList,
}: Props) {
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const { isFavoriteItem } = useFindFood();
  const favoriteFood = isFavoriteItem(selectedFood.name);

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: favoriteFood ? 232 : 306,
    active: isEditing,
  });

  const dispatch = useDispatch();

  const onSubmitPress = () => {
    setIsEditing(false);
    const editedInfo = {
      expiredDate: selectedFood.expiredDate,
      category: selectedFood.category,
    };

    setCheckedList((prev) =>
      prev.map((food) => {
        return food.name === selectedFood.name
          ? { ...food, ...editedInfo }
          : food;
      })
    );

    dispatch(selectNone());
  };

  return (
    <Animated.View style={{ height, overflow: 'hidden' }}>
      <View
        style={tw.style(
          `p-2.5 pt-0.5 bg-stone-200 border border-slate-300 rounded-xl`,
          shadowStyle(3)
        )}
      >
        <FormMessage
          message={
            !!isFavoriteItem(selectedFood.name)
              ? '자주 먹는 식료품은 소비기한 정보만 변경 가능합니다.'
              : '소비기한과 카테고리 정보만 변경 가능합니다.'
          }
          color='green'
          active={true}
        />

        <View style={tw`my-2 gap-3`}>
          {/* 카테고리 수정 */}
          {!favoriteFood && (
            <CategoryItem
              name={selectedFood.name}
              fixedCategory={selectedFood.category}
              changeInfo={(category: { [key: string]: string }) => {
                dispatch(select({ ...selectedFood, ...category }));
              }}
              title='카테고리 선택'
            />
          )}
          {/* 소비기한 수정 */}
          <ExpiredDateItem
            date={selectedFood.expiredDate}
            changeInfo={(expiredFood: { [key: string]: string }) => {
              dispatch(select({ ...selectedFood, ...expiredFood }));
            }}
          />
        </View>

        <TouchableOpacity
          onPress={onSubmitPress}
          style={tw`border border-slate-300 bg-indigo-600 py-1.5 items-center rounded-full`}
        >
          <Text style={tw`text-white`}>수정 완료</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
