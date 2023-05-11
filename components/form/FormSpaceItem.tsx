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
                compartmentNum: '1번' as CompartmentNum,
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
              {space.slice(0, 3)}
            </Text>
            <Text
              styletw={`${
                space === editedFood.space ? 'text-lime-200' : 'text-lime-700'
              }`}
            >
              {space.slice(3, 6)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
