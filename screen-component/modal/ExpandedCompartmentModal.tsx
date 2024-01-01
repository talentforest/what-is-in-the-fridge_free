import { ScrollView, View, useWindowDimensions } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { FoodPosition } from '../../constant/fridgeInfo';
import { useDispatch, useSelector } from '../../redux/hook';
import { showExpandCompartmentModal } from '../../redux/slice/modalVisibleSlice';
import { useGetFoodList } from '../../hooks';

import EmptySign from '../../components/common/EmptySign';
import FoodBox from '../../components/common/FoodBox';
import FadeInMiddleModal from '../../components/modal/FadeInMiddleModal';
import tw from 'twrnc';

interface Props {
  position: FoodPosition;
}

export default function ExpandedCompartmentModal({ position }: Props) {
  const {
    expandCompartmentModal: { modalVisible },
  } = useSelector((state) => state.modalVisible);

  const { height } = useWindowDimensions();

  const { getMatchedPositionFoods } = useGetFoodList();

  const dispatch = useDispatch();

  const closeModal = () => {
    const expandCompartmentInfo = {
      modalVisible: false,
      compartmentNum: position?.compartmentNum,
    };
    dispatch(showExpandCompartmentModal(expandCompartmentInfo));
  };

  const foodList = getMatchedPositionFoods(
    'allFoods',
    position?.space,
    position?.compartmentNum
  );

  return (
    <>
      {position && (
        <FadeInMiddleModal
          title={`${position.compartmentNum}칸 크게 보기`}
          isVisible={modalVisible}
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
                message='아직 식료품이 없어요'
                assetSize={60}
                compartmentNum={position.compartmentNum}
              />
            </View>
          )}
        </FadeInMiddleModal>
      )}
    </>
  );
}
