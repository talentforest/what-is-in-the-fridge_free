import { View } from 'react-native';
import { Food } from '../../constant/foods';
import tw from 'twrnc';
import FormNameItem from './FormNameItem';
import FormCategoryItem from './FormCategoryItem';
import FormQuantityItem from './FormQuantityItem';
import FormFavoriteItem from './FormFavoriteItem';
import FormDateItem from './FormDateItem';

interface Props {
  changeFoodInfo: (newInfo: { [key: string]: string | boolean }) => void;
  food: Food;
}

export default function FoodForm({ changeFoodInfo, food }: Props) {
  return (
    <View style={tw`w-full mt-2 mb-4`}>
      <FormNameItem
        changeFoodInfo={changeFoodInfo}
        value={food.name}
        placeholder='식료품 이름을 수정해주세요'
      />
      <View style={tw`mt-1 flex-row gap-1`}>
        <FormCategoryItem
          category={food.category}
          changeFoodInfo={changeFoodInfo}
        />
        <FormQuantityItem
          keyboardType='numeric'
          changeFoodInfo={changeFoodInfo}
          value={food.quantity}
        />
        <FormFavoriteItem
          favorite={food.favorite}
          changeFoodInfo={changeFoodInfo}
        />
      </View>
      <View style={tw`mt-1 flex-row gap-1`}>
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
