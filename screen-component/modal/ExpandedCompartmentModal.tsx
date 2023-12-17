import { ScrollView, View, useWindowDimensions } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { CompartmentNum } from '../../constant/fridgeInfo';
import { useDispatch, useSelector } from '../../redux/hook';
import { showExpandCompartmentModal } from '../../redux/slice/modalVisibleSlice';

import EmptySign from '../../components/common/EmptySign';
import FoodBox from '../../components/common/FoodBox';
import FadeInMiddleModal from '../../components/modal/FadeInMiddleModal';
import tw from 'twrnc';

interface Props {
  compartmentNum: CompartmentNum;
  foodList: Food[];
}

export default function ExpandedCompartmentModal({
  compartmentNum,
  foodList,
}: Props) {
  const { expandCompartmentModal } = useSelector((state) => state.modalVisible);

  const { height } = useWindowDimensions();

  const dispatch = useDispatch();

  const closeModal = () => {
    const expandCompartmentInfo = { modalVisible: false, compartmentNum };
    dispatch(showExpandCompartmentModal(expandCompartmentInfo));
  };

  return (
    <FadeInMiddleModal
      title={`${compartmentNum}칸 크게 보기`}
      isVisible={expandCompartmentModal?.modalVisible}
      closeModal={closeModal}
    >
      {!!foodList.length ? (
        <ScrollView
          style={tw`h-[${height * 0.45}px] bg-sky-100 rounded-xl`}
          contentContainerStyle={tw`p-2 flex-row flex-wrap gap-1`}
          showsVerticalScrollIndicator={false}
        >
          {foodList.map((food: Food) => (
            <FoodBox key={food.id} food={food} />
          ))}
        </ScrollView>
      ) : (
        <View
          style={tw`h-[${height * 0.3}px]
            flex-row items-center justify-center`}
        >
          <EmptySign
            message='식료품이 아직 없어요'
            assetSize={60}
            compartmentNum={compartmentNum}
          />
        </View>
      )}
    </FadeInMiddleModal>
  );
}
