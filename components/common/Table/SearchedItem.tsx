import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { cutLetter } from '../../../util';
import { Space } from '../../../constant/fridgeInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../../navigation/Navigation';
import { Food } from '../../../constant/foods';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  setModalVisible: (modalVisible: boolean) => void;
  food: Food;
}

export default function SearchedItem({ setModalVisible, food }: Props) {
  const navigation = useNavigation<NavigateProp>();

  const { name, space, compartmentNum } = food;

  const onNavigatePress = (space: Space) => {
    navigation.navigate('Compartments', { space });
    setModalVisible(false);
  };

  const textColor = (space: Space) => {
    return space.includes('냉장실') ? 'text-blue-600' : 'text-green-600';
  };

  return (
    <View
      style={tw`gap-2 border-b border-slate-300 mx-3 px-1 flex-row items-center`}
    >
      <Text style={tw`w-[35%] text-slate-700`}>{cutLetter(name, 6)}</Text>
      <Text style={tw`flex-1 text-slate-500`}>
        <Text style={tw`${textColor(space)}`}>{space}</Text> {compartmentNum}칸
      </Text>
      <TouchableOpacity
        onPress={() => onNavigatePress(space)}
        style={tw`p-3 pr-1`}
      >
        <Icon type='MaterialCommunityIcons' name='arrow-top-right' size={18} />
      </TouchableOpacity>
    </View>
  );
}
