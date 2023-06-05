import { ScrollView, View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { useSelector } from '../redux/hook';
import { Space } from '../constant/fridgeInfo';
import CheckSquareBtn from '../components/screen-component/setting/CheckSquareBtn';
import SquareBtn from '../components/screen-component/setting/SquareItem';
import FridgeShape from '../components/common/FridgeShape';
import tw from 'twrnc';

export default function FridgeSetting() {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  return (
    <SafeBottomAreaView style={tw`flex-1 bg-neutral-50`}>
      <ScrollView style={tw`flex-1 p-4`} contentContainerStyle={tw`pb-20`}>
        <View style={tw`mb-8`}>
          <Text styletw='text-indigo-600 mb-2'>나의 냉장고</Text>
          <View
            style={tw`border border-slate-300 rounded-lg w-full items-center py-4 bg-white`}
          >
            <FridgeShape />
          </View>
        </View>

        <View style={tw`gap-1 mb-8`}>
          <Text styletw='text-indigo-600'>나의 냉장고 타입</Text>
          <CheckSquareBtn
            name='일반형 냉장고'
            iconName='fridge'
            check={fridgeInfo.type === '일반형 냉장고'}
            disabled
          />
          <Text styletw='text-slate-500 text-xs'>
            현재 일반형 냉장고만 지원됩니다.
          </Text>
        </View>

        <View style={tw`gap-2 mb-8`}>
          <Text styletw='text-indigo-600'>냉동실 위치</Text>
          <CheckSquareBtn
            name='상단'
            iconName='fridge-bottom'
            check={fridgeInfo.freezer === 'top'}
          />
          <CheckSquareBtn
            name='하단'
            iconName='fridge-top'
            check={fridgeInfo.freezer === 'bottom'}
          />
        </View>

        <View style={tw`gap-1 mb-6`}>
          <Text styletw='text-indigo-600'>각 공간의 칸 개수</Text>
          {['냉동실 안쪽', '냉동실 문쪽', '냉장실 안쪽', '냉장실 문쪽'].map(
            (name) => (
              <SquareBtn key={name} name={name as Space} />
            )
          )}
        </View>
      </ScrollView>
    </SafeBottomAreaView>
  );
}
