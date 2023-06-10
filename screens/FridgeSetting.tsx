import { ScrollView, View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { useSelector } from '../redux/hook';
import { Space } from '../constant/fridgeInfo';
import { BG_LIGHT_GRAY } from '../constant/colors';
import { scaleH } from '../util';
import CheckSquareBtn from '../components/screen-component/setting/CheckSquareBtn';
import SquareBtn from '../components/screen-component/setting/SquareItem';
import FridgeShape from '../components/common/FridgeShape';
import tw from 'twrnc';

export default function FridgeSetting() {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  return (
    <SafeBottomAreaView style={tw`bg-[${BG_LIGHT_GRAY}]`}>
      <ScrollView contentContainerStyle={tw`pb-10 px-4`}>
        <View style={tw`flex-1 mb-8 h-[${scaleH(72)}]`}>
          <Text style={tw`text-indigo-600 mb-4`}>나의 냉장고</Text>
          <View style={tw`flex-1 w-2/3 mx-auto`}>
            <FridgeShape />
          </View>
        </View>

        <View style={tw`gap-2 mb-8`}>
          <Text style={tw`text-indigo-600`}>나의 냉장고 타입</Text>
          <CheckSquareBtn
            name='일반형 냉장고'
            iconName='fridge'
            check={fridgeInfo.type === '일반형 냉장고'}
            disabled
          />
          <Text style={tw`text-slate-500`} fontSize={12}>
            현재 일반형 냉장고만 지원됩니다.
          </Text>
        </View>

        <View style={tw`gap-2 mb-8`}>
          <Text style={tw`text-indigo-600`}>냉동실 위치</Text>
          <View style={tw`flex-row gap-1.5`}>
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
        </View>

        <View style={tw`gap-2`}>
          <Text style={tw`text-indigo-600`}>각 공간의 칸 개수</Text>
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
