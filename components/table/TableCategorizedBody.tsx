import { FlatList, View } from 'react-native';
import { Text } from '../common/native-component';
import { useSelector } from '../../redux/hook';
import { Food } from '../../constant/foodInfo';
import { foodCategories } from '../../constant/foodCategories';
import { AnimationState, useGetFoodList } from '../../hooks';
import { Filter } from '../../util';

import TableItem from './TableItem';
import IndicatorExist from '../common/IndicatorExist';
import CategoryImageIcon from '../common/CategoryImageIcon';
import EmptySign from '../common/EmptySign';
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
    getFilteredSortByCategoryList,
    getFilteredFoodList,
    orderExpirationDate,
    favoriteFoods,
  } = useGetFoodList();

  const filteredFoodList = getFilteredFoodList(currentFilter, favoriteFoods);

  const data = (filter: Filter) => {
    const categoryFilter = foodCategories.find(
      ({ category }) => category === filter
    );
    return categoryFilter
      ? [categoryFilter.category]
      : foodCategories.map(({ category }) => category);
  };

  return (
    <>
      {!!filteredFoodList.length ? (
        <View style={tw`flex-1 -mx-2`}>
          <FlatList
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-25`}
            data={data(currentFilter)}
            renderItem={({ item }) =>
              getFilteredSortByCategoryList(item).length ? (
                <View style={tw`mb-4`}>
                  <View style={tw`flex-row items-center mx-2 gap-1 mb-1`}>
                    <CategoryImageIcon kind='icon' size={15} category={item} />
                    <Text style={tw`text-sm text-slate-600`}>{item}</Text>
                    <Text style={tw`text-sm text-slate-600`}>
                      {getFilteredSortByCategoryList(item).length}
                    </Text>
                  </View>
                  <FlatList
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={tw`pb-5`}
                    data={orderExpirationDate(
                      getFilteredSortByCategoryList(item)
                    )}
                    scrollEnabled={true}
                    keyboardDismissMode='on-drag'
                    renderItem={({ item: food }) => (
                      <TableItem
                        food={food}
                        onCheckBoxPress={onCheckBoxPress}
                        isCheckedItem={
                          !!checkedList.find((check) => check.id === food.id)
                        }
                        animationState={animationState}
                        afterAnimation={afterAnimation}
                      >
                        <IndicatorExist name={food.name} space={food.space} />
                      </TableItem>
                    )}
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
          <EmptySign message='자주 먹는 식료품이 없어요.' />
        </View>
      )}
    </>
  );
}
