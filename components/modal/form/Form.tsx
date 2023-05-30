import { View } from 'react-native';
import { Food } from '../../../constant/foods';
import tw from 'twrnc';
import FormItemContainer from './FormItemContainer';
import CategoryItem from './CategoryItem';
import IconItem from './IconItem';
import SpaceItem from './SpaceItem';
import DateItem from './DateItem';
import NameItem from './NameItem';
import FavoriteItem from './FavoriteItem';
import { Text } from '../../native-component';

export type Label =
  | '위치 선택'
  | '아이콘과 이름'
  | '카테고리'
  | '구매날짜'
  | '유통기한'
  | '즐겨찾는 식품인가요?'
  | false;

interface Props {
  items: Label[];
  food: Food;
  changeInfo: (newInfo: { [key: string]: string | boolean }) => void;
  editableName: boolean;
}

export default function Form({ items, changeInfo, food, editableName }: Props) {
  // 유효성 검사
  // 이름은 변경할 수 없게. 만약 수정했을 때 이미 냉장고에 있는 음식과 중복으로 있게 만들면 안되니까.

  return (
    <>
      {items.includes('아이콘과 이름') && (
        <FormItemContainer label='아이콘과 이름'>
          <View style={tw`flex-row items-center justify-between gap-1`}>
            <IconItem value={food.image} changeInfo={changeInfo} />
            <NameItem
              name={food.name}
              changeInfo={changeInfo}
              editable={editableName}
            />
          </View>
          {!editableName && (
            <Text styletw='ml-12 mt-1 text-xs'>이름은 변경할 수 없습니다.</Text>
          )}
        </FormItemContainer>
      )}

      {items.includes('위치 선택') && (
        <FormItemContainer label='위치 선택'>
          <SpaceItem food={food} changeInfo={changeInfo} />
        </FormItemContainer>
      )}

      {items.includes('카테고리') && (
        <FormItemContainer label='카테고리'>
          <CategoryItem category={food.category} changeInfo={changeInfo} />
        </FormItemContainer>
      )}

      {items.includes('구매날짜') && (
        <FormItemContainer label='구매날짜'>
          <DateItem
            date={new Date(food.purchaseDate)}
            changeInfo={changeInfo}
          />
        </FormItemContainer>
      )}

      {items.includes('유통기한') && (
        <FormItemContainer label='유통기한'>
          <DateItem
            expiredDate
            date={new Date(food.expiredDate)}
            changeInfo={changeInfo}
          />
        </FormItemContainer>
      )}

      {items.includes('즐겨찾는 식품인가요?') && (
        <FormItemContainer label='즐겨찾는 식품인가요?'>
          <FavoriteItem favorite={food.favorite} changeInfo={changeInfo} />
        </FormItemContainer>
      )}
    </>
  );
}
