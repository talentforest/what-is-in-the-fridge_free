import { Animated, View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { INDIGO, LIGHT_GRAY } from '../../constant/colors';
import { cutLetter } from '../../util';
import {
  AnimationState,
  useDragBox,
  useFindFood,
  useSlideAnimation,
} from '../../hooks';
import { Food } from '../../constant/foodInfo';
import { useState } from 'react';

import CheckBox from '../../components/common/CheckBox';
import Icon from '../../components/common/native-component/Icon';
import PantryFoodInfo from './PantryFoodInfo';
import CategoryImageIcon from '../../components/common/CategoryImageIcon';
import AddPantryFoodModal from '../modal/AddPantryFoodModal';
import tw from 'twrnc';

interface Props {
  food: Food;
  isCheckedItem: boolean;
  onCheckBoxPress: (food: Food) => void;
  animationState: AnimationState;
  afterAnimation: () => void;
}

export default function PantryListBox({
  food,
  isCheckedItem,
  onCheckBoxPress,
  animationState,
  afterAnimation,
}: Props) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const { name, category, expiredDate, purchaseDate } = food;

  const { isFavoriteItem } = useFindFood();

  const slideDownIn = animationState === 'slidedown-in';
  const slideUpOut = animationState === 'slideup-out';

  const isNotAllInfo = expiredDate === '' && purchaseDate === '';
  const isOneInfo =
    (purchaseDate !== '' && expiredDate === '') ||
    (expiredDate !== '' && purchaseDate === '');

  const MAX_LENGTH = 15;
  const ITEM_HEIGHT = isNotAllInfo ? 55 : isOneInfo ? 95 : 125;

  const initialValue =
    isCheckedItem && slideUpOut ? ITEM_HEIGHT : slideDownIn ? 0 : ITEM_HEIGHT;
  const toValue = isCheckedItem && slideUpOut ? 0 : ITEM_HEIGHT;

  const { height, interpolatedOpacity } = useSlideAnimation({
    initialValue,
    toValue,
    active: slideDownIn || slideUpOut,
    afterAnimation,
  });

  const { translateX, panResponder } = useDragBox();

  const textColor = isCheckedItem ? 'text-amber-600' : 'text-slate-800';

  return (
    <View>
      {/* <DragLeftBtn height={ITEM_HEIGHT} /> */}

      <Animated.View
        style={{
          height,
          opacity: interpolatedOpacity,
          overflow: 'hidden',
          transform: [{ translateX }],
          paddingHorizontal: 8,
        }}
        // {...panResponder.panHandlers}
      >
        <View
          style={tw`shadow-lg flex-row items-center border bg-white
          h-[${ITEM_HEIGHT - 8}px] ${
            isCheckedItem ? 'border-amber-600' : 'border-slate-300'
          }`}
        >
          <TouchableOpacity
            onPress={() => onCheckBoxPress(food)}
            style={tw`gap-2 px-3 py-2 flex-row shadow-lg`}
          >
            <View style={tw`pt-1.2`}>
              <CheckBox checked={!!isCheckedItem} activeColor='amber' />
            </View>

            <View style={tw`flex-1 justify-center`}>
              <View
                style={tw`${
                  isNotAllInfo ? '' : 'border-b border-slate-300 mb-1 pb-1'
                } flex-row items-center flex-wrap gap-1.5`}
              >
                <Text style={tw`mr-1 ${textColor}`}>
                  {cutLetter(name, MAX_LENGTH)}
                </Text>
                <CategoryImageIcon kind='icon' size={18} category={category} />
                <View style={tw`pt-0.5 ml-0.5`}>
                  <Icon
                    name='tag-heart'
                    type='MaterialCommunityIcons'
                    size={17}
                    color={!!isFavoriteItem(name) ? INDIGO : LIGHT_GRAY}
                  />
                </View>
              </View>

              {expiredDate !== '' && (
                <PantryFoodInfo title='유통기한' date={expiredDate} />
              )}

              {purchaseDate !== '' && (
                <PantryFoodInfo title='구매날짜' date={purchaseDate} />
              )}
              <TouchableOpacity
                onPress={() => setOpenEditModal(true)}
                style={tw`absolute right-0 bottom-0 mb-1 self-end p-2 -m-2`}
              >
                <Icon
                  name='pencil'
                  type='MaterialCommunityIcons'
                  size={17}
                  color={LIGHT_GRAY}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {openEditModal && (
        <AddPantryFoodModal
          modalVisible={openEditModal}
          setModalVisible={setOpenEditModal}
          foodToEdit={food}
        />
      )}
    </View>
  );
}
