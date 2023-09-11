import { Animated, View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { INDIGO, LIGHT_GRAY } from '../../constant/colors';
import { cutLetter } from '../../util';
import { AnimationState, useDragBox, useSlideAnimation } from '../../hooks';
import { Food } from '../../constant/foodInfo';

import CheckBox from '../../components/common/CheckBox';
import Icon from '../../components/common/native-component/Icon';
import PantryFoodInfo from './PantryFoodInfo';
import CategoryImageIcon from '../../components/common/CategoryImageIcon';
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
  const { name, favorite, category, expiredDate, purchaseDate } = food;

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
    <View style={tw`shadow-md px-2`}>
      {/* <DragLeftBtn height={ITEM_HEIGHT} /> */}

      <Animated.View
        style={{
          height,
          opacity: interpolatedOpacity,
          overflow: 'hidden',
          transform: [{ translateX }],
        }}
        // {...panResponder.panHandlers}
      >
        <View
          style={tw`flex-row items-center border h-[${ITEM_HEIGHT - 8}px] ${
            isCheckedItem ? 'border-amber-600' : 'border-slate-300'
          } bg-white`}
        >
          <TouchableOpacity
            onPress={() => onCheckBoxPress(food)}
            style={tw`gap-2 pr-3 pl-3 flex-row`}
          >
            <View style={tw`pt-1.2`}>
              <CheckBox checked={!!isCheckedItem} activeColor='amber' />
            </View>

            <View style={tw`flex-1 justify-center`}>
              <View
                style={tw`${
                  isNotAllInfo ? '' : 'border-b border-slate-300 mb-1 pb-1'
                } flex-row items-center flex-wrap gap-1`}
              >
                <Text style={tw`${textColor}`}>
                  {cutLetter(name, MAX_LENGTH)}
                </Text>
                <CategoryImageIcon kind='icon' size={18} category={category} />
              </View>

              {expiredDate !== '' && (
                <PantryFoodInfo title='유통기한' date={expiredDate} />
              )}

              {purchaseDate !== '' && (
                <PantryFoodInfo title='구매날짜' date={purchaseDate} />
              )}
            </View>

            <View style={tw`pt-1.5`}>
              <Icon
                name='tag-heart'
                type='MaterialCommunityIcons'
                size={17}
                color={favorite ? INDIGO : LIGHT_GRAY}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
