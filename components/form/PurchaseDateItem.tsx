import { useDispatch, useSelector } from '../../redux/hook';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';
import { Animated, View } from 'react-native';
import { InputStyle, TextInput } from '../common/native-component';
import { closeKeyboard, getFormattedDate } from '../../util';
import { useEffect } from 'react';
import { useItemSlideAnimation } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';
import { minusControlDateBtns } from '../../constant/controlDateBtns';
import { DEEP_GRAY } from '../../constant/colors';
import { togglePurchaseItemOpen } from '../../redux/slice/food/isMemoOpenSlice';

import FormLabel from './FormLabel';
import ControlDateBtn from '../buttons/ControlDateBtn';
import CheckBoxItem from '../common/CheckBoxItem';
import tw from 'twrnc';

export default function PurchaseDateItem() {
  const {
    formFood: { purchaseDate },
  } = useSelector((state) => state.formFood);
  const { isPurchaseItemOpen } = useSelector((state) => state.isFormItemOpen);

  const dispatch = useDispatch();

  const setDate = purchaseDate === '' ? new Date() : new Date(purchaseDate);

  const formattedDate = getFormattedDate(setDate, 'YY.MM.DD');

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: 82,
    active: isPurchaseItemOpen,
  });

  useEffect(() => {
    if (purchaseDate !== '') {
      dispatch(togglePurchaseItemOpen(true));
    }
  }, []);

  const changeDate = (date: Date | string) => {
    const purchaseDate = date ? getFormattedDate(date, 'YYYY-MM-DD') : '';
    return dispatch(editFormFood({ purchaseDate }));
  };

  const onPress = () => {
    closeKeyboard();
    dispatch(togglePurchaseItemOpen(!isPurchaseItemOpen));
    changeDate(!isPurchaseItemOpen ? new Date() : '');
  };

  return (
    <View>
      <FormLabel label='구매날짜'>
        <CheckBoxItem
          onPress={onPress}
          checked={!isPurchaseItemOpen}
          title='구매날짜가 중요하지 않아요'
          activeColor={DEEP_GRAY}
          size={15}
        />
      </FormLabel>

      <Animated.View style={tw.style(`overflow-hidden -mx-1 px-1`, { height })}>
        <View
          style={tw.style(
            `flex-row items-center ${InputStyle} p-0`,
            shadowStyle(3)
          )}
        >
          <TextInput
            editable={false}
            value={formattedDate}
            style={tw`border-0 w-23 h-full`}
          />
        </View>

        <View style={tw`mt-1.5 gap-1 flex-row flex-wrap items-start`}>
          {minusControlDateBtns.map((btn) => (
            <ControlDateBtn
              key={btn.label}
              type='minus'
              btn={btn}
              changeDate={changeDate}
              date={purchaseDate}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
}
