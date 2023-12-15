import { View } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { changeSetting } from '../redux/slice/fridgeInfoSlice';
import { InsideDisplay } from '../constant/fridgeInfo';
import { shadowStyle } from '../constant/shadowStyle';
import { Text, TouchableOpacity } from '../components/common/native-component';
import { GRAY } from '../constant/colors';
import { exampleFridgeFoods, examplePantryFoods } from '../constant/foodInfo';

import SelectContainter from '../screen-component/fridge-setting/SelectContainter';
import CheckBoxItem from '../components/common/CheckBoxItem';
import Container from '../components/common/Container';
import CategoryIcon from '../components/common/CategoryIcon';
import Icon from '../components/common/native-component/Icon';
import tw from 'twrnc';

export default function SettingFridgeInside() {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const dispatch = useDispatch();

  const onChangePress = (info: { [key: string]: string }) => {
    dispatch(changeSetting({ ...fridgeInfo, ...info }));
  };

  const exampleFoods = [...exampleFridgeFoods, ...examplePantryFoods];

  return (
    <Container>
      <SelectContainter title='내부 식료품 보기 설정'>
        <View style={tw`gap-2 flex-row`}>
          {InsideDisplay.map((insideDisplayType) => (
            <TouchableOpacity
              onPress={() => onChangePress({ insideDisplayType })}
              key={insideDisplayType}
              style={tw.style(
                `border ${
                  insideDisplayType === fridgeInfo.insideDisplayType
                    ? 'border-blue-600'
                    : 'border-slate-300 opacity-80'
                } h-45 rounded-xl bg-white gap-2 flex-1 py-2 px-3 items-center justify-between`,
                shadowStyle(3)
              )}
            >
              {insideDisplayType === '칸별로 보기' && (
                <View
                  style={tw`border border-slate-300 flex-1 bg-blue-100 p-1.5 gap-1.5 w-4/5 rounded-lg`}
                >
                  {[1, 2, 3].map((compartment) => (
                    <View
                      key={compartment}
                      style={tw`flex-row items-end border gap-1 p-1 border-slate-300 flex-1 bg-white rounded-md`}
                    >
                      <View
                        style={tw.style(
                          `border border-slate-300 bg-white rounded-lg flex-row items-center gap-0.5 p-0.5 px-1`,
                          shadowStyle(3)
                        )}
                      >
                        <CategoryIcon
                          category={exampleFoods[compartment - 1].category}
                          size={12}
                        />
                        <Text fontSize={14}>
                          {exampleFoods[compartment - 1].name}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {insideDisplayType === '목록으로 보기' && (
                <View style={tw`w-4/5 gap-1 flex-1 my-1`}>
                  <View style={tw`flex-row items-center gap-0.5`}>
                    <Icon
                      name='list-unordered'
                      type='Octicons'
                      size={11}
                      color={GRAY}
                    />
                    <Text fontSize={13}>식료품 이름</Text>
                  </View>

                  {exampleFoods.map((food) => (
                    <View
                      key={food.name}
                      style={tw`px-1.5 border border-slate-400 flex-1 items-center justify-between flex-row bg-white rounded-md`}
                    >
                      <View style={tw`flex-row items-center gap-0.5`}>
                        <CategoryIcon category={food.category} size={12} />
                        <Text fontSize={14}>{food.name}</Text>
                      </View>

                      <View style={tw`flex-row items-center gap-0.5`}>
                        <Text fontSize={13}>{food.quantity}</Text>
                        <Icon
                          name='kebab-horizontal'
                          type='Octicons'
                          size={13}
                          color={GRAY}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              )}

              <CheckBoxItem
                title={insideDisplayType}
                onPress={() => onChangePress({ insideDisplayType })}
                checked={insideDisplayType === fridgeInfo.insideDisplayType}
              />
            </TouchableOpacity>
          ))}
        </View>
      </SelectContainter>
    </Container>
  );
}
