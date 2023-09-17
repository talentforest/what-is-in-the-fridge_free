import { FlatList, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text } from '../common/native-component';
import { useSelector } from '../../redux/hook';
import { Food } from '../../constant/foodInfo';
import { AnimationState, useGetFoodList } from '../../hooks';

import TableItem from './TableItem';
import IndicatorExist from '../common/IndicatorExist';
import CategoryImageIcon from '../common/CategoryImageIcon';
import EmptySign from '../common/EmptySign';
import PantryListBox from '../../screen-component/pantry-foods/PantryListBox';
import tw from 'twrnc';

interface Props {
  onCheckBoxPress: (food: Food) => void;
  checkedList: Food[];
  animationState: AnimationState;
  afterAnimation: () => void;
}

export default function TableCategorizedBody({
  onCheckBoxPress,
  checkedList,
  animationState,
  afterAnimation,
}: Props) {
  const { currentFilter } = useSelector((state) => state.currentFilter);

  const {
    getExistCategoryList,
    getFilteredSortByCategoryList,
    getFilteredFoodList,
    favoriteFoods,
    pantryFoods,
    orderExpirationDate,
  } = useGetFoodList();

  const route = useRoute();
  const routeFavoriteFoods = route.name === 'FavoriteFoods';
  const title = routeFavoriteFoods ? '자주 먹는 식료품' : '팬트리 식료품';
  const foodList = routeFavoriteFoods ? favoriteFoods : pantryFoods;

  const filteredFoodList = getFilteredFoodList(currentFilter, foodList);

  return (
    <>
      {!!filteredFoodList.length ? (
        <View style={tw`flex-1 -mx-2`}>
          <FlatList
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-25`}
            data={getExistCategoryList()}
            renderItem={({ item }) =>
              getFilteredSortByCategoryList(item).length ? (
                <View style={tw`mb-4`}>
                  <View style={tw`flex-row items-center gap-1 ml-2 mb-1`}>
                    <CategoryImageIcon kind='icon' size={15} category={item} />
                    <Text style={tw`text-sm text-slate-600`}>{item}</Text>
                  </View>
                  <FlatList
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={tw`pb-5`}
                    data={orderExpirationDate(
                      getFilteredSortByCategoryList(item)
                    )}
                    renderItem={({ item: food }) =>
                      routeFavoriteFoods ? (
                        <TableItem
                          food={food}
                          onCheckBoxPress={onCheckBoxPress}
                          isCheckedItem={
                            !!checkedList.find((check) => check.id === food.id)
                          }
                          animationState={animationState}
                          afterAnimation={afterAnimation}
                        >
                          <IndicatorExist name={food.name} />
                        </TableItem>
                      ) : (
                        <PantryListBox
                          key={food.id}
                          food={food}
                          onCheckBoxPress={onCheckBoxPress}
                          isCheckedItem={
                            !!checkedList.find((check) => check.id === food.id)
                          }
                          animationState={animationState}
                          afterAnimation={afterAnimation}
                        />
                      )
                    }
                  />
                </View>
              ) : (
                <></>
              )
            }
          />
        </View>
      ) : (
        <View style={tw`pt-24 flex-1 border-t -mx-4 border-slate-300`}>
          <EmptySign
            message={`${currentFilter} 카테고리에, ${title}이 없어요.`}
          />
        </View>
      )}
    </>
  );
}
