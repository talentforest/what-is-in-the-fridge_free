import { Alert, View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { alertPhrase } from '../../constant/alertPhrase';
import { Food } from '../../constant/foodInfo';
import { MAX_LIST_LENGTH } from '../../constant/fridgeInfo';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  title: string;
  foodList: Food[];
  spaceTotalLength: number;
  setOpenAddFoodModal: (modal: boolean) => void;
}

export default function CompartmentHeader({
  title,
  spaceTotalLength,
  foodList,
  setOpenAddFoodModal,
}: Props) {
  return (
    <View>
      <View style={tw`flex-row justify-between items-center pl-2.5 h-7.5`}>
        <Text
          style={tw`${
            foodList.length ? 'text-blue-600' : 'text-slate-500'
          }  text-[15px]`}
        >
          {title} | 식료품 총 {foodList.length}개
        </Text>

        <TouchableOpacity
          onPress={() => {
            if (spaceTotalLength === MAX_LIST_LENGTH)
              return Alert.alert(
                alertPhrase.excess.title,
                alertPhrase.excess.msg
              );
            setOpenAddFoodModal(true);
          }}
          style={tw`px-1 pl-6 border border-stone-50 rounded-md h-full items-center justify-center `}
        >
          <Icon type='MaterialCommunityIcons' name='plus' size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
