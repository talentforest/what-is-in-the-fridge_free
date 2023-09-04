import { ScrollView, View } from 'react-native';
import {
  SafeBottomAreaView,
  Text,
} from '../components/common/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { Space, SpaceType } from '../constant/fridgeInfo';
import { changeSetting } from '../redux/slice/fridgeInfoSlice';

import Fridge from '../components/common/Fridge';
import SelectContainter from '../screen-component/fridge-setting/SelectContainter';
import CompartmentsSettingBox from '../screen-component/fridge-setting/CompartmentsSettingBox';
import Container from '../components/common/Container';
import CheckBoxItem from '../components/common/CheckBoxItem';
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

  return (
    <SafeBottomAreaView>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`border border-slate-300 mb-6 rounded-lg bg-white`}>
            <View
              style={tw`bg-blue-200 justify-center items-center py-3 rounded-t-lg`}
            >
              <Text style={tw`text-blue-700`}>나의 냉장고 모습</Text>
            </View>
            <View style={tw`flex-1 w-[45%] h-60 mx-auto my-3`}>
              <Fridge />
            </View>
          </View>
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
      </Container>
    </SafeBottomAreaView>
  );
}
