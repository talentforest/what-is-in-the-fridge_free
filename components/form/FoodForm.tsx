import { View } from 'react-native';
import { Food } from '../../constant/foods';
import tw from 'twrnc';
import FormNameItem from './FormNameItem';
import FormCategoryItem from './FormCategoryItem';
import FormFavoriteItem from './FormFavoriteItem';
import FormDateItem from './FormDateItem';
import FormImageItem from './FormImageItem';
import { useNavigation } from '@react-navigation/native';
import {
  RootNavParamList,
  RootStackParamList,
} from '../../navigation/Navigation';
import { Text } from '../native-component';
import { RootTabParamList } from '../../navigation/MyTabs';

interface Props {
  selectedFood?: Food;
  changeFoodInfo: (newInfo: { [key: string]: string | boolean }) => void;
  food: Food;
}

export default function FoodForm({
  selectedFood,
  changeFoodInfo,
  food,
}: Props) {
  const navigation = useNavigation();
  const routes = navigation.getState().routes;
  const currRoute = routes[routes.length - 1].name as keyof RootNavParamList;

  return (
    <View style={tw`mb-4`}>
      {!selectedFood?.image.length && !(currRoute === 'FavoriteFoods') && (
        <View style={tw`gap-1 mb-1`}>
          <View style={tw`flex-row h-22 gap-1`}>
            <FormImageItem value={food.image} changeFoodInfo={changeFoodInfo} />
            {currRoute === 'ShoppingList' ? (
              <View
                style={tw`flex-1 justify-between bg-indigo-50 rounded-lg border-slate-400 border p-2`}
              >
                <Text styletw='mb-2 text-indigo-500 text-xs'>식료품 이름</Text>
                <Text styletw='text-lg text-indigo-600'>{food.name}</Text>
              </View>
            ) : (
              <FormNameItem
                changeFoodInfo={changeFoodInfo}
                value={food.name}
                placeholder='식료품 이름을 수정해주세요'
              />
            )}
          </View>
          <View style={tw`h-24 flex-row gap-1`}>
            <FormCategoryItem
              category={food.category}
              changeFoodInfo={changeFoodInfo}
            />
            <FormFavoriteItem
              favorite={food.favorite}
              changeFoodInfo={changeFoodInfo}
            />
          </View>
        </View>
      )}
      <View style={tw`h-58 gap-1`}>
        <FormDateItem
          label='식료품 구매날짜'
          date={new Date(food.purchaseDate)}
          changeFoodInfo={changeFoodInfo}
        />
        <FormDateItem
          label='식료품 유통기한'
          date={new Date(food.expirationDate)}
          changeFoodInfo={changeFoodInfo}
        />
      </View>
    </View>
  );
}
