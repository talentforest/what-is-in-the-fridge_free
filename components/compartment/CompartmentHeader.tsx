import { View } from 'react-native';
import { Text } from '../common/native-component';
import { Food, MAX_LIMIT } from '../../constant/foodInfo';
import AddIconBtn from '../buttons/AddIconBtn';
import tw from 'twrnc';
import { useDispatch, useSelector } from '../../redux/hook';
import {
  setAlertInfo,
  toggleAlertModal,
} from '../../redux/slice/alertModalSlice';
import { alertPhrase } from '../../constant/alertPhrase';
import { useFindFood } from '../../hooks';

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
  const { allFoods } = useFindFood();

  const dispatch = useDispatch();
  const onPress = () => {
    if (allFoods.length >= MAX_LIMIT) {
      const {
        excessTotal: { title, msg },
      } = alertPhrase;
      dispatch(toggleAlertModal(true));
      dispatch(setAlertInfo({ title, msg, btns: ['확인'] }));
      return;
    }
    setOpenAddFoodModal(true);
  };

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
