import { View } from 'react-native';
import { Text } from '../common/native-component';
import { Food } from '../../constant/foodInfo';
import AddIconBtn from '../buttons/AddIconBtn';
import tw from 'twrnc';

interface Props {
  title: string;
  foodList: Food[];
  setOpenAddFoodModal: (modal: boolean) => void;
}

export default function CompartmentHeader({
  title,
  foodList,
  setOpenAddFoodModal,
}: Props) {
  const onPress = () => setOpenAddFoodModal(true);

  return (
    <View>
      <View style={tw`flex-row justify-between items-center pl-2.5 h-7.5`}>
        <Text
          style={tw`${foodList.length ? 'text-blue-600' : 'text-slate-500'} 
          text-base`}
        >
          {title} / 식료품 총 {foodList.length}개
        </Text>

        <AddIconBtn onPress={onPress} />
      </View>
    </View>
  );
}
