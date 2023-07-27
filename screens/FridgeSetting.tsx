import { ScrollView, View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { Space } from '../constant/fridgeInfo';
import { scaleH } from '../util';
import { changeSetting } from '../redux/slice/fridgeInfoSlice';
import FridgeShape from '../components/common/FridgeShape';
import CheckBoxItem from '../components/modal/form/CheckBoxItem';
import SelectContainter from '../components/screen-component/setting/SelectContainter';
import Container from '../components/common/LayoutBox/Container';
import CompartmentsSettingBox from '../components/screen-component/setting/CompartmentsSettingBox';
import tw from 'twrnc';

export default function FridgeSetting() {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const dispatch = useDispatch();

  const onChangePress = (info: { [key: string]: string }) => {
    dispatch(changeSetting({ ...fridgeInfo, ...info }));
  };

  return (
    <SafeBottomAreaView>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SelectContainter title='1. 나의 냉장고 타입'>
            {['일반형 냉장고'].map((type) => (
              <CheckBoxItem
                key={type}
                title={type}
                onPress={() => onChangePress({ type })}
                checked={fridgeInfo.type === type}
              />
            ))}
            <Text fontSize={14} style={tw`text-slate-500 mt-1`}>
              현재 일반형 냉장고만 지원됩니다.
            </Text>
          </SelectContainter>
          <SelectContainter title='2. 냉동실 위치'>
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
                    fridgeInfo.freezer === (name === '상단' ? 'top' : 'bottom')
                  }
                />
              ))}
            </View>
          </SelectContainter>
          <SelectContainter title='3. 각 공간의 칸 개수'>
            <View style={tw`flex-row gap-1.5`}>
              {['냉동실'].map((type) =>
                [`${type} 안쪽`, `${type} 문쪽`].map((name) => (
                  <CompartmentsSettingBox key={name} name={name as Space} />
                ))
              )}
            </View>
            <View style={tw`flex-row gap-1.5`}>
              {['냉장실'].map((type) =>
                [`${type} 안쪽`, `${type} 문쪽`].map((name) => (
                  <CompartmentsSettingBox key={name} name={name as Space} />
                ))
              )}
            </View>
          </SelectContainter>
          <SelectContainter title='냉장고 결과'>
            <View style={tw`flex-1 w-[70%] h-${scaleH(80)} mx-auto`}>
              <FridgeShape />
            </View>
          </SelectContainter>
        </ScrollView>
      </Container>
    </SafeBottomAreaView>
  );
}
