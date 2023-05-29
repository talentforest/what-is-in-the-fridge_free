import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import { GRAY } from '../../constant/colors';
import useRouteName from '../../hooks/useRouteName';

interface Props {
  onDeletePress: () => void;
  btnName:
    | '자주 먹는 식료품 해제'
    | '나의 냉장고에서 삭제'
    | '장보기 목록에 추가';

  addShoppingListPress?: () => void;
}

export default function FixedBtn({
  onDeletePress,
  addShoppingListPress,
  btnName,
}: Props) {
  const { currRoute } = useRouteName();

  return (
    <View style={tw`gap-2 p-3 w-full bottom-0 bg-white`}>
      <Text styletw='text-indigo-700'>선택 항목</Text>
      <TouchableOpacity
        onPress={onDeletePress}
        style={tw`bg-indigo-500 py-2.5 px-4 flex-row items-center gap-1.5 border border-indigo-300 rounded-md self-start`}
      >
        <View style={tw`w-5 text-center items-center`}>
          <Icon name='trash-can-outline' size={18} color='#fff' />
        </View>
        <Text styletw='text-white'>{btnName}</Text>
      </TouchableOpacity>
      {currRoute === 'ExpiredFoods' && (
        <View style={tw`flex-row gap-2`}>
          <Icon name='arrow-right-bottom' size={18} color={GRAY} />
          <Text styletw='text-slate-500'>
            냉장고에서 정리하신 식품을 삭제해주세요.
          </Text>
        </View>
      )}
      {addShoppingListPress && (
        <TouchableOpacity
          onPress={addShoppingListPress}
          style={tw`bg-teal-600 border-indigo-300 py-2.5 px-4 flex-row items-center gap-1.5 border rounded-md self-start`}
        >
          <View style={tw`w-5 text-center items-center`}>
            <Icon name='basket-plus-outline' size={18} color='#fff' />
          </View>
          <Text styletw={'text-white'}>장보기 목록 추가</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
