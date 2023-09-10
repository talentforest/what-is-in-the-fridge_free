import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { cutLetter } from '../../util';
import { Space } from '../../constant/fridgeInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { Food } from '../../constant/foodInfo';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  setModalVisible: (modalVisible: boolean) => void;
  food: Food;
}

export default function TableSearchedItem({ setModalVisible, food }: Props) {
  const navigation = useNavigation<NavigateProp>();

  const { name, space, compartmentNum } = food;

  const onNavigatePress = (space: Space) => {
    navigation.navigate('Compartments', { space, searchedName: name });
    setModalVisible(false);
  };

  const textColor = (space: Space) => {
    return space.includes('냉장실') ? 'text-blue-600' : 'text-green-600';
  };

  return (
    <View
      style={tw`gap-2 border-b border-slate-300 px-1 flex-row items-center`}
    >
      <Text style={tw`w-[40%] text-slate-700 text-sm`}>
        {cutLetter(name, 9)}
      </Text>
      <Text style={tw`flex-1 text-slate-500 text-sm`}>
        <Text style={tw`${textColor(space)} text-sm`}>{space}</Text>{' '}
        {compartmentNum}칸
      </Text>
      <TouchableOpacity
        onPress={() => onNavigatePress(space)} //
        style={tw`p-3 pr-1`}
      >
        <Icon type='MaterialCommunityIcons' name='arrow-top-right' size={18} />
      </TouchableOpacity>
    </View>
  );
}
