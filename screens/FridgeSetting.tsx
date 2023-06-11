import { ScrollView, View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { Space } from '../constant/fridgeInfo';
import { BG_LIGHT_GRAY } from '../constant/colors';
import { scaleH } from '../util';
import { changeLocation } from '../redux/slice/fridgeInfoSlice';
import SquareBtn from '../components/screen-component/setting/SquareItem';
import FridgeShape from '../components/common/FridgeShape';
import CheckBoxItem from '../components/modal/form/CheckBoxItem';
import tw from 'twrnc';

export default function FridgeSetting() {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const dispatch = useDispatch();

  return (
    <SafeBottomAreaView style={tw`bg-[${BG_LIGHT_GRAY}]`}>
      <ScrollView contentContainerStyle={tw`pt-4 pb-10 px-4`}>
        <View style={tw`flex-1 mb-[${scaleH(40)}] h-[${scaleH(72)}]`}>
          <Text style={tw`text-indigo-600 mb-4`}>나의 냉장고</Text>
          <View style={tw`flex-1 w-[60%] mx-auto`}>
            <FridgeShape />
          </View>
        </View>

        <View style={tw`gap-2 mb-[${scaleH(40)}]`}>
          <Text style={tw`text-indigo-600`}>나의 냉장고 타입</Text>
          <CheckBoxItem
            title='일반형 냉장고'
            onPress={() => console.log('disabled')}
            check={fridgeInfo.type === '일반형 냉장고'}
            disabled
          />
          <Text style={tw`text-slate-500`} fontSize={12}>
            현재 일반형 냉장고만 지원됩니다.
          </Text>
        </View>

        <View style={tw`gap-2 mb-[${scaleH(40)}]`}>
          <Text style={tw`text-indigo-600`}>냉동실 위치</Text>
          <View style={tw`flex-row gap-5`}>
            {['상단', '하단'].map((name) => (
              <CheckBoxItem
                key={name}
                title={name}
                onPress={() =>
                  dispatch(
                    changeLocation({
                      freezer: name === '상단' ? 'top' : 'bottom',
                    })
                  )
                }
                check={
                  fridgeInfo.freezer === (name === '상단' ? 'top' : 'bottom')
                }
              />
            ))}
          </View>
        </View>

        <View style={tw`gap-2 flex-1`}>
          <Text style={tw`text-indigo-600`}>각 공간의 칸 개수</Text>

          {['냉동실', '냉장실'].map((type) => (
            <View key={type} style={tw`flex-row gap-2`}>
              {[`${type} 안쪽`, `${type} 문쪽`].map((name) => (
                <SquareBtn key={name} name={name as Space} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeBottomAreaView>
  );
}
