import { View } from 'react-native';
import { Text } from '../../native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../../navigation/Navigation';
import { Food } from '../../../constant/foods';
import LeftDay from '../../common/LeftDay';
import FoodTag from './FoodTag';
import Title from '../../common/Title';
import Box from '../../common/Box';
import tw from 'twrnc';

interface Props {
  title: EntranceTitle;
  foods: Food[];
  desc: string;
}

export type EntranceTitle = '유통기한 주의 식료품' | '자주 먹는 식료품';

export default function EntranceBox({ title, foods, desc }: Props) {
  const navigation = useNavigation<NavigateProp>();

  const onPress = () => {
    navigation.navigate(
      title === '자주 먹는 식료품' ? 'FavoriteFoods' : 'ExpiredFoods'
    );
  };

  return (
    <Box
      bgColor={title === '자주 먹는 식료품' ? 'bg-yellow-500' : 'bg-slate-500'}
    >
      <Title
        title={title}
        iconName={
          title === '자주 먹는 식료품'
            ? 'fridge-outline'
            : 'alert-circle-outline'
        }
      />
      <Text style={tw`text-white my-2.5`}>{desc}</Text>
      <View style={tw`gap-2 flex-row justify-between mt-1`}>
        {foods.length !== 0 && (
          <View style={tw`flex-row gap-0.5 flex-wrap flex-1`}>
            {foods.slice(0, 6).map((food) => (
              <FoodTag key={food.id} food={food}>
                {title === '유통기한 주의 식료품' && (
                  <LeftDay fontSize={12} expiredDate={food.expiredDate} />
                )}
              </FoodTag>
            ))}
            {foods.length > 6 && (
              <Text style={tw`text-amber-500 self-end pl-2 pb-1`} fontSize={12}>
                ...더보기
              </Text>
            )}
          </View>
        )}
      </View>
    </Box>
  );
}
