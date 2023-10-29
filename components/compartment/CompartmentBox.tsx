import { LayoutChangeEvent, ScrollView, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { TouchableOpacity } from '../common/native-component';
import { LIGHT_BLUE } from '../../constant/colors';
import { useDispatch, useSelector } from '../../redux/hook';
import { select } from '../../redux/slice/selectedFoodSlice';
import { shadowStyle } from '../../constant/shadowStyle';
import { PlatformIOS } from '../../constant/statusBarHeight';
import { scrollTo } from '../../util';

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
  scrollViewRef: any;
}

export default function CompartmentBox({
  title,
  foodList,
  setOpenFoodDetailModal,
  setExpandCompartment,
  setOpenAddFoodModal,
  scrollViewRef,
}: Props) {
  const { searchedFoodName } = useSelector((state) => state.searchedFoodName);

  const dispatch = useDispatch();

  const onItemLayout = (event: LayoutChangeEvent, food: Food) => {
    if (searchedFoodName === food.name) {
      const { y } = event.nativeEvent.layout;
      scrollTo(scrollViewRef, 0, y);
    }
    return null;
  };

  return (
    <View style={tw`flex-1 border border-slate-300 bg-white rounded-lg`}>
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
          contentContainerStyle={tw`flex-row px-1 pt-0.5 pb-12 flex-wrap gap-1.3 items-center`}
          showsVerticalScrollIndicator={false}
        >
          {foodList.map((food: Food) => (
            <TouchableOpacity
              key={food.id}
              onPress={() => {
                dispatch(select(food));
                setOpenFoodDetailModal(true);
              }}
              style={{
                borderRadius: 8,
                backgroundColor: '#fff',
                ...shadowStyle(PlatformIOS ? 3 : 4),
              }}
              onLayout={(event: LayoutChangeEvent) => onItemLayout(event, food)}
            >
              <FoodBox food={food} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={tw`flex-1 flex-row items-center justify-center`}>
          <EmptySign message='식료품이 아직 없어요.' assetSize={60} />
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
