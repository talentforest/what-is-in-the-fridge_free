import { ScrollView, View } from 'react-native';
import {
  SafeBottomAreaView,
  Text,
} from '../components/common/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { Space, SpaceType } from '../constant/fridgeInfo';
import { changeSetting } from '../redux/slice/fridgeInfoSlice';
import { shadowStyle } from '../constant/shadowStyle';

import SelectContainter from '../screen-component/fridge-setting/SelectContainter';
import CompartmentsSettingBox from '../screen-component/fridge-setting/CompartmentsSettingBox';
import CheckBoxItem from '../components/common/CheckBoxItem';
import Fridge from '../components/fridge/Fridge';
import tw from 'twrnc';

export default function SettingFridge() {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const dispatch = useDispatch();

  const onChangePress = (info: { [key: string]: string }) => {
    dispatch(changeSetting({ ...fridgeInfo, ...info }));
  };

  const onPress = (name: string) => {
    const position = name === '상단' ? 'top' : 'bottom';
    onChangePress({ freezer: position });
  };

  return (
    <SafeBottomAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`py-4`}
        contentContainerStyle={tw`pb-12`}
      >
        <View style={tw`py-3 mb-7 gap-2`}>
          <View
            style={tw.style(
              `border border-slate-400 bg-white px-3 py-1.5 self-center rounded-full`,
              shadowStyle(3)
            )}
          >
            <Text>현재 냉장고 모습</Text>
          </View>
          <Fridge />
        </View>

        <SelectContainter title='나의 냉장고 타입'>
          {['일반형 냉장고'].map((type) => (
            <View key={type} style={tw`h-9`}>
              <CheckBoxItem
                title={type}
                onPress={() => onChangePress({ type })}
                checked={fridgeInfo.type === type}
              />
            </View>
          ))}
          <Text fontSize={15} style={tw`my-1 text-slate-500`}>
            현재 일반형 냉장고만 지원하고 있어요
          </Text>
        </SelectContainter>

        <SelectContainter title='냉동실 위치'>
          <View style={tw`flex-row gap-4`}>
            {['상단', '하단'].map((name) => (
              <View key={name} style={tw`h-9`}>
                <CheckBoxItem
                  title={name}
                  onPress={() => onPress(name)}
                  checked={
                    fridgeInfo.freezer === (name === '상단' ? 'top' : 'bottom')
                  }
                />
              </View>
            ))}
          </View>
        </SelectContainter>

        <SelectContainter title='각 공간의 칸 개수'>
          {(['냉동실', '냉장실'] as SpaceType[]).map((spaceType) => (
            <View key={spaceType} style={tw`flex-row gap-1.5`}>
              {[`${spaceType} 안쪽`, `${spaceType} 문쪽`].map((space) => (
                <CompartmentsSettingBox key={space} space={space as Space} />
              ))}
            </View>
          ))}
        </SelectContainter>
      </ScrollView>
    </SafeBottomAreaView>
  );
}
