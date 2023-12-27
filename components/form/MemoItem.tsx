import { Animated, View } from 'react-native';
import { useEffect } from 'react';
import {
  InputStyle,
  Text,
  TextInput,
  TouchableOpacity,
} from '../common/native-component';
import { useItemSlideAnimation } from '../../hooks';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleMemoOpen } from '../../redux/slice/food/isMemoOpenSlice';
import { shadowStyle } from '../../constant/shadowStyle';
import { PlatformIOS } from '../../constant/statusBarHeight';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';
import { closeKeyboard } from '../../util';
import { MEDIUM_GRAY } from '../../constant/colors';

import FormLabel from './FormLabel';
import FormMessage from './FormMessage';
import IconChevronUp from '../svg/arrow/IconChevronUp';
import IconChevronDown from '../svg/arrow/IconChevronDown';
import tw from 'twrnc';
import ChevronToggleBtn from '../buttons/ChevronToggleBtn';

const MEMO_MAX_LENGTH = 70;

export default function MemoItem() {
  const {
    formFood: { memo },
  } = useSelector((state) => state.formFood);

  const { isMemoOpen } = useSelector((state) => state.isFormItemOpen);

  const dispatch = useDispatch();

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: 65,
    active: isMemoOpen,
  });

  useEffect(() => {
    dispatch(toggleMemoOpen(memo !== '' ? true : false));
  }, []);

  const onChangeText = (value: string) =>
    dispatch(editFormFood({ memo: value }));

  const onOpenPress = () => {
    dispatch(toggleMemoOpen(true));
  };

  const onClosePress = () => {
    closeKeyboard();
    dispatch(toggleMemoOpen(false));
    dispatch(editFormFood({ memo: '' }));
  };

  const onPress = isMemoOpen ? onClosePress : onOpenPress;

  return (
    <View>
      <FormLabel label='메모'>
        <ChevronToggleBtn onPress={onPress} isOpen={isMemoOpen} />
      </FormLabel>

      <Animated.View
        style={{
          height,
          overflow: 'hidden',
          marginHorizontal: -4,
        }}
      >
        <View style={tw`flex-row items-center gap-1 px-1`}>
          <View
            style={tw.style(
              `py-${PlatformIOS ? '0.5' : '2'} ${InputStyle}
               h-16 px-0 flex-1 flex-row items-center`,
              shadowStyle(3)
            )}
          >
            <TextInput
              style={tw.style(`border-0 w-full h-full`, {
                lineHeight: 20,
                textAlignVertical: 'top', // android
              })}
              onChangeText={onChangeText}
              value={memo}
              placeholder='또다른 추가정보는 메모로 작성해주세요'
              multiline
              numberOfLines={3}
              returnKeyType='done'
              blurOnSubmit={true}
              maxLength={MEMO_MAX_LENGTH}
            />
          </View>
        </View>
      </Animated.View>

      <FormMessage
        active={memo.length >= MEMO_MAX_LENGTH && isMemoOpen}
        color='orange'
        message={`메모는 ${MEMO_MAX_LENGTH}자를 넘을 수 없습니다`}
      />
    </View>
  );
}
