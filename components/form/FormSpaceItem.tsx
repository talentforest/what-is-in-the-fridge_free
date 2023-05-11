import { Dimensions, View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { CompartmentNum, SpaceName } from '../../constant/fridgeInfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';
import { Food } from '../../constant/foods';

interface Props {
  editedFood: Food;
  editFoodInfo: (newInfo: { [key: string]: string | boolean }) => void;
}

export default function FormSpaceItem({ editedFood, editFoodInfo }: Props) {
  const compartmentNums: CompartmentNum[] = editedFood.space.includes('냉동')
    ? ['1번', '2번']
    : ['1번', '2번', '3번'];

  return (
    <View style={tw`border border-slate-400 bg-indigo-100 mb-1 p-2 rounded-lg`}>
      <Text styletw='mb-2 text-indigo-500 text-xs'>식료품 위치 선택</Text>
      <View style={tw`flex-wrap flex-row gap-1`}>
        {SpaceName.map((space) => (
          <TouchableOpacity
            key={space}
            onPress={() => {
              editFoodInfo({
                space,
                compartmentNum:
                  editedFood.compartmentNum === '3번' && space.includes('냉동')
                    ? '2번'
                    : editedFood.compartmentNum,
              });
            }}
            style={tw`border border-slate-400 flex-row h-10 w-[${
              (Dimensions.get('window').width - 56) / 2
            }px] rounded-md justify-center items-center ${
              space === editedFood.space ? 'bg-indigo-600' : 'bg-white'
            }`}
          >
            <Icon
              name={space.includes('냉동') ? 'fridge-bottom' : 'fridge-top'}
              size={20}
              color={`${space === editedFood.space ? '#fff' : '#006eff'}`}
            />
            <Text
              styletw={`${
                space === editedFood.space ? 'text-blue-100' : 'text-blue-600'
              } pl-2`}
            >
              {space}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text styletw='text-xs text-indigo-500 my-2'>추가할 칸</Text>
      <View style={tw`flex-row gap-1`}>
        {compartmentNums.map((compartmentNum) => (
          <TouchableOpacity
            key={compartmentNum}
            onPress={() => editFoodInfo({ compartmentNum })}
            style={tw`border border-slate-400 rounded-lg px-4 py-2 ${
              editedFood.compartmentNum === compartmentNum
                ? 'bg-indigo-600'
                : 'bg-white'
            }`}
          >
            <Text
              styletw={`${
                editedFood.compartmentNum === compartmentNum
                  ? 'text-white'
                  : 'text-indigo-600'
              }`}
            >
              {compartmentNum} 칸
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}