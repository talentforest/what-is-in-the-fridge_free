import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { DEEP_INDIGO } from '../../../constant/colors';
import { useSelector } from '../../../redux/hook';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../../navigation/Navigation';
import useExpiredFoods from '../../../hooks/useExpiredFoods';
import Icon from 'react-native-vector-icons/Feather';
import FridgeShape from './FridgeShape';
import tw from 'twrnc';

export default function FridgeInfo() {
  const { allFoods } = useSelector((state) => state.allFoods);
  const { allExpiredFoods } = useExpiredFoods();

  const navigation = useNavigation<NavigateProp>();

  return (
    <View style={tw`mb-2`}>
      <Text styletw='text-base text-indigo-600 mt-2'>나의 냉장고 정보</Text>
      <View style={tw`flex-row w-full my-2 justify-center gap-6`}>
        <FridgeShape />
        <View style={tw`gap-2 w-1/2 justify-center pt-2`}>
          <Text styletw='text-slate-700'>일반형 냉장고 (냉동실 위)</Text>
          <View style={tw`flex-row items-end`}>
            <Text styletw='text-slate-700'>냉장고 식료품 : </Text>
            <Text styletw='text-base text-indigo-600'>{allFoods.length}개</Text>
          </View>
          <View style={tw`flex-row items-end`}>
            <Text styletw='text-slate-700'>유통기한 주의 식료품 : </Text>
            <Text styletw='text-base text-indigo-600'>
              {allExpiredFoods.length}개
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Setting')}
        style={tw`flex-row items-center self-end`}
      >
        <Text styletw='text-indigo-800 text-xs'>변경하기</Text>
        <Icon name='chevron-right' size={16} color={DEEP_INDIGO} />
      </TouchableOpacity>
    </View>
  );
}
