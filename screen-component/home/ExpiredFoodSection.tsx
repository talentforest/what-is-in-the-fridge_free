import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { Food } from '../../constant/foods';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';

import HeaderTitle from './HeaderTitle';
import LeftDay from '../../components/common/LeftDay';
import MessageBox from './MessageBox';
import tw from 'twrnc';
import EmptySign from '../../components/common/EmptySign';

interface Props {
  foodList: Food[];
}

const MAX_NUM = 4;

export default function ExpiredFoodSection({ foodList }: Props) {
  const navigation = useNavigation<NavigateProp>();

  return (
    <View style={tw`flex-1`}>
      <HeaderTitle title='유통기한 주의 식료품' screen='ExpiredFoods' />
      <View style={tw`my-2`}>
        {foodList.length ? (
          <View style={tw`shadow-lg gap-1.5 py-2`}>
            {foodList.slice(0, MAX_NUM).map((food) => (
              <View
                style={tw`flex-row items-center justify-between border border-slate-300 bg-white py-2 px-4 rounded-lg`}
                key={food.id}
              >
                <Text>{food.name}</Text>
                <LeftDay expiredDate={food.expiredDate} />
              </View>
            ))}
            {foodList.length > MAX_NUM && (
              <TouchableOpacity
                onPress={() => navigation.navigate('ExpiredFoods')}
                style={tw`flex-row items-center justify-center bg-blue-100 border border-blue-400 py-2 px-3 rounded-full`}
              >
                <Text style={tw`text-center text-sm text-blue-600`}>
                  더보기
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View
            style={tw`items-center h-40 border border-slate-300 rounded-xl bg-white justify-center flex-1`}
          >
            <EmptySign message='자주 먹는 식료품이 없습니다.' />
          </View>
        )}
      </View>
      <MessageBox desc='빨리 먹어야 하는 식료품을 확인하세요' />
    </View>
  );
}
