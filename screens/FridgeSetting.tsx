import { ScrollView, View } from 'react-native';
import {
  SafeBottomAreaView,
  Text,
} from '../components/common/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { Space, SpaceType } from '../constant/fridgeInfo';
import { changeSetting } from '../redux/slice/fridgeInfoSlice';
import { PlatformIOS } from '../constant/statusBarHeight';

import SelectContainter from '../screen-component/fridge-setting/SelectContainter';
import CompartmentsSettingBox from '../screen-component/fridge-setting/CompartmentsSettingBox';
import CheckBoxItem from '../components/common/CheckBoxItem';
import AndroidFridge from '../components/fridge/AndroidFridge';
import IOSFridge from '../components/fridge/IOSFridge';
import AnchoredBannerAd from '../components/ads/AnchoredBannerAd';
import tw from 'twrnc';

export default function FridgeSetting() {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const dispatch = useDispatch();

  const onChangePress = (info: { [key: string]: string }) => {
    dispatch(changeSetting({ ...fridgeInfo, ...info }));
  };

  const onPress = (name: string) => {
    const position = name === '상단' ? 'top' : 'bottom';
    onChangePress({ freezer: position });
  };

  const width = 160;

  return (
    <SafeBottomAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`p-4`}
        contentContainerStyle={tw`pb-12`}
      >
        <SelectContainter title='나의 냉장고 모습'>
          {PlatformIOS ? (
            <View style={tw`mx-auto my-2 h-[${width * 1.5}px] w-[${width}px]`}>
              <IOSFridge />
            </View>
          ) : (
            <View style={tw`w-[${width}px] h-[${width * 1.1}px] mx-auto my-2`}>
              <AndroidFridge />
            </View>
          )}
        </SelectContainter>
        <SelectContainter title='나의 냉장고 타입'>
          {['일반형 냉장고'].map((type) => (
            <CheckBoxItem
              key={type}
              title={type}
              onPress={() => onChangePress({ type })}
              checked={fridgeInfo.type === type}
            />
          ))}
          <Text style={tw`text-slate-500 text-sm`}>
            현재 일반형 냉장고만 지원하고 있어요.
          </Text>
        </SelectContainter>

        <SelectContainter title='냉동실 위치'>
          <View style={tw`flex-row gap-5`}>
            {['상단', '하단'].map((name) => (
              <CheckBoxItem
                key={name}
                title={name}
                onPress={() => onPress(name)}
                checked={
                  fridgeInfo.freezer === (name === '상단' ? 'top' : 'bottom')
                }
              />
            ))}
          </View>
        </SelectContainter>

        <SelectContainter title='각 공간의 칸 개수'>
          {(['냉동실', '냉장실'] as SpaceType[]).map((spaceType) => (
            <View key={spaceType} style={tw`flex-row gap-2`}>
              {[`${spaceType} 안쪽`, `${spaceType} 문쪽`].map((space) => (
                <CompartmentsSettingBox key={space} space={space as Space} />
              ))}
            </View>
          ))}
        </SelectContainter>
      </ScrollView>

      <AnchoredBannerAd />
    </SafeBottomAreaView>
  );
}
