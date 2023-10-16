import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { ReactNode } from 'react';
import { TouchableOpacity } from '../common/native-component';
import { LIGHT_BLUE } from '../../constant/colors';

import CompartmentHeader from './CompartmentHeader';
import EmptySign from '../common/EmptySign';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
  title: string;
  foodList: Food[];
  spaceTotalLength: number;
  setExpandCompartment?: (modal: boolean) => void;
  setOpenAddFoodModal: (modal: boolean) => void;
  scrollViewRef: any;
}

export default function CompartmentBox({
  title,
  foodList,
  spaceTotalLength,
  children,
  setExpandCompartment,
  setOpenAddFoodModal,
  scrollViewRef,
}: Props) {
  return (
    <View style={tw`flex-1 border border-slate-300 bg-white rounded-lg`}>
      <CompartmentHeader
        title={title}
        foodList={foodList}
        spaceTotalLength={spaceTotalLength}
        setOpenAddFoodModal={setOpenAddFoodModal}
      />

      {!!foodList.length ? (
        <ScrollView
          ref={scrollViewRef}
          scrollEnabled
          style={tw`px-1 flex-1`}
          contentContainerStyle={tw`flex-row px-1 pt-0.5 pb-12 flex-wrap gap-1.3 items-center`}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={tw`flex-1 flex-row items-center pb-5 justify-center`}>
          <EmptySign message='식료품이 아직 없어요.' />
        </View>
      )}

      {setExpandCompartment && (
        <TouchableOpacity
          onPress={() => {
            setExpandCompartment(true);
          }}
          style={tw`absolute border border-white right-1.5 bottom-1.5`}
          disabled={false}
        >
          <Icon
            type='MaterialCommunityIcons'
            name='resize-bottom-right'
            size={30}
            color={LIGHT_BLUE}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
