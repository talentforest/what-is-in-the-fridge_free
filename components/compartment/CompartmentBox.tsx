import { MutableRefObject } from 'react';
import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { TouchableOpacity } from '../common/native-component';
import { CompartmentNum } from '../../constant/fridgeInfo';

import CompartmentHeader from './CompartmentHeader';
import EmptySign from '../common/EmptySign';
import FoodBox from '../common/FoodBox';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  title: string;
  foodList: Food[];
  setOpenFoodDetailModal?: (modal: boolean) => void;
  setExpandCompartment?: (modal: boolean) => void;
  setOpenAddFoodModal: (modal: boolean) => void;
  scrollViewRef: MutableRefObject<ScrollView>;
}

export default function CompartmentBox({
  title,
  foodList,
  setOpenFoodDetailModal,
  setExpandCompartment,
  setOpenAddFoodModal,
  scrollViewRef,
}: Props) {
  const compartmentNum = title.slice(0, 2) as CompartmentNum;

  return (
    <View style={tw`flex-1 border border-slate-200 bg-white rounded-lg`}>
      <CompartmentHeader
        title={title}
        foodList={foodList}
        setOpenAddFoodModal={setOpenAddFoodModal}
      />

      {!!foodList.length ? (
        <ScrollView
          ref={scrollViewRef}
          scrollEnabled
          style={tw`px-1 flex-1`}
          contentContainerStyle={tw`flex-row px-1 pt-0.5 pb-12 flex-wrap gap-1.2 items-center`}
          showsVerticalScrollIndicator={false}
        >
          {foodList.map((food: Food) => (
            <FoodBox
              key={food.id}
              food={food}
              scrollViewRef={scrollViewRef}
              setOpenFoodDetailModal={setOpenFoodDetailModal}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={tw`flex-1 mb-2 flex-row items-center justify-center`}>
          <EmptySign
            message={'식료품이 아직 없어요.'}
            assetSize={32}
            compartmentNum={compartmentNum}
          />
        </View>
      )}

      {setExpandCompartment && (
        <TouchableOpacity
          onPress={() => setExpandCompartment(true)}
          style={tw`absolute border border-white p-2 left-0 bottom-0`}
          disabled={false}
        >
          <Icon type='Feather' name='maximize' size={15} />
        </TouchableOpacity>
      )}
    </View>
  );
}
