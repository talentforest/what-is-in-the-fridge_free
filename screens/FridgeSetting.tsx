import { ScrollView, View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { Space } from '../constant/fridgeInfo';
import { BG_LIGHT_GRAY } from '../constant/colors';
import { scaleH } from '../util';
import { changeSetting } from '../redux/slice/fridgeInfoSlice';
import VariationBtn from '../components/screen-component/setting/VariationBtn';
import FridgeShape from '../components/common/FridgeShape';
import CheckBoxItem from '../components/modal/form/CheckBoxItem';
import tw from 'twrnc';

export default function FridgeSetting() {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const dispatch = useDispatch();

  const onChangePress = (info: { [key: string]: string }) => {
    dispatch(changeSetting({ ...fridgeInfo, ...info }));
  };

  return (
    <SafeBottomAreaView style={tw`bg-[${BG_LIGHT_GRAY}]`}>
      <ScrollView contentContainerStyle={tw`pt-4 pb-10 px-4`}>
        <View style={tw`gap-2 mb-2`}>
          <Text style={tw`text-indigo-600`}>나의 냉장고 타입</Text>
          <View style={tw`flex-row gap-5 pt-2`}>
            {['일반형 냉장고', '냉장고 타입 설정 없음'].map((type) => (
              <CheckBoxItem
                key={type}
                title={type}
                onPress={() => onChangePress({ type })}
                checked={fridgeInfo.type === type}
              />
            ))}
          </View>
        </View>
        {fridgeInfo.type === '냉장고 타입 설정 없음' && (
          <View
            style={tw`border border-slate-300 bg-white rounded-lg items-center justify-center my-4 h-[${scaleH(
              40
            )}]`}
          >
            <Text style={tw`text-slate-500`}>
              설정한 냉장고 타입이 없습니다.
            </Text>
          </View>
        )}
        {fridgeInfo.type === '일반형 냉장고' && (
          <>
            <View
              style={tw`h-[${scaleH(
                68
              )}] border w-full py-3 rounded-lg border-slate-300 bg-white`}
            >
              <View style={tw`flex-1 w-[55%] mx-auto`}>
                <FridgeShape />
              </View>
            </View>
            <Text
              style={tw`text-slate-500 mt-2 mb-[${scaleH(40)}]`}
              fontSize={12}
            >
              현재 일반형 냉장고만 지원됩니다.
            </Text>
            <View style={tw`gap-2 mb-[${scaleH(40)}]`}>
              <Text style={tw`text-indigo-600`}>냉동실 위치</Text>
              <View style={tw`flex-row gap-5`}>
                {['상단', '하단'].map((name) => (
                  <CheckBoxItem
                    key={name}
                    title={name}
                    onPress={() =>
                      onChangePress({
                        freezer: name === '상단' ? 'top' : 'bottom',
                      })
                    }
                    checked={
                      fridgeInfo.freezer ===
                      (name === '상단' ? 'top' : 'bottom')
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
                    <VariationBtn key={name} name={name as Space} />
                  ))}
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeBottomAreaView>
  );
}
