import { ScrollView, View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { Space } from '../constant/fridgeInfo';
import { scaleH } from '../util';
import { changeSetting } from '../redux/slice/fridgeInfoSlice';
import VariationBtn from '../components/screen-component/setting/VariationBtn';
import FridgeShape from '../components/common/FridgeShape';
import CheckBoxItem from '../components/modal/form/CheckBoxItem';
import tw from 'twrnc';
import SelectContainter from '../components/screen-component/setting/SelectContainter';
import Container from '../components/common/LayoutBox/Container';

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
            <View style={tw`gap-3`}>
              {['일반형 냉장고'].map((type) => (
                <CheckBoxItem
                  key={type}
                  title={type}
                  onPress={() => onChangePress({ type })}
                  checked={fridgeInfo.type === type}
                />
              ))}
              <Text style={tw`text-slate-500 mt-1`} fontSize={12}>
                현재 일반형 냉장고만 지원됩니다.
              </Text>
            </View>
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
            {['냉동실', '냉장실'].map((type) => (
              <View key={type} style={tw`flex-row gap-1`}>
                {[`${type} 안쪽`, `${type} 문쪽`].map((name) => (
                  <VariationBtn key={name} name={name as Space} />
                ))}
              </View>
            ))}
          </SelectContainter>
          <SelectContainter title='냉장고 결과'>
            <View style={tw`flex-1 w-[70%] h-[${scaleH(80)}] mx-auto`}>
              <FridgeShape />
            </View>
          </SelectContainter>
        </ScrollView>
      </Container>
    </SafeBottomAreaView>
  );
}
