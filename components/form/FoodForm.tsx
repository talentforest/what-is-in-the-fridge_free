import { View } from 'react-native';
import { Food } from '../../constant/foods';
import { Text } from '../native-component';
import tw from 'twrnc';
import FormNameItem from './FormNameItem';
import FormCategoryItem from './FormCategoryItem';
import FormFavoriteItem from './FormFavoriteItem';
import FormDateItem from './FormDateItem';
import FormImageItem from './FormImageItem';
import FormSpaceItem from './FormSpaceItem';
import InfoBox from '../modal/component/InfoBox';

interface Props {
  selectedFood?: Food;
  changeFoodInfo: (newInfo: { [key: string]: string | boolean }) => void;
  food: Food;
  noBigFoodImg?: boolean;
  spaceItem?: boolean;
  imageItem?: boolean;
  nameItem?: boolean;
  categoryItem?: boolean;
  favoriteItem?: boolean;
}

export default function FoodForm({
  selectedFood,
  changeFoodInfo,
  food,
  noBigFoodImg,
  spaceItem,
  nameItem,
  imageItem,
  categoryItem,
  favoriteItem,
}: Props) {
  return (
    <View style={tw`mb-4`}>
      {!noBigFoodImg && selectedFood?.image && (
        <Text styletw='self-center my-4 text-6xl pt-2'>{food.image}</Text>
      )}
      {imageItem && !selectedFood?.favorite && (
        <View
          style={tw`w-full flex-row gap-1 justify-center mb-3 h-22 shadow-lg`}
        >
          <FormImageItem value={food.image} changeFoodInfo={changeFoodInfo} />
        </View>
      )}
      <View style={tw`flex-row gap-1 mb-1 h-24`}>
        {nameItem && !selectedFood?.favorite ? (
          <FormNameItem
            changeFoodInfo={changeFoodInfo}
            value={food.name}
            placeholder='식료품 이름을 수정해주세요'
          />
        ) : (
          <InfoBox name='이름' info={food.name} />
        )}
        {categoryItem && !selectedFood?.favorite ? (
          <FormCategoryItem
            category={food.category}
            changeFoodInfo={changeFoodInfo}
          />
        ) : (
          <InfoBox name='카테고리' info={food.category} />
        )}
        {favoriteItem && !selectedFood?.favorite ? (
          <FormFavoriteItem
            favorite={food.favorite}
            changeFoodInfo={changeFoodInfo}
          />
        ) : (
          <InfoBox name='자주 먹는 식료품' favorite={food.favorite} />
        )}
      </View>
      {spaceItem && (
        <FormSpaceItem editedFood={food} editFoodInfo={changeFoodInfo} />
      )}
      <View style={tw`gap-1 flex-row`}>
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
