import { Animated, Keyboard, View } from 'react-native';
import { useEffect } from 'react';
import { InputStyle, TextInput } from '../common/native-component';
import { useSlideAnimation } from '../../hooks';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleMemoOpen } from '../../redux/slice/isMemoOpenSlice';
import { shadowStyle } from '../../constant/shadowStyle';
import { PlatformIOS } from '../../constant/statusBarHeight';
import FormLabel from './FormLabel';
import FormMessage from './FormMessage';
import tw from 'twrnc';

interface Props {
  memo: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

const MEMO_MAX_LENGTH = 70;

export default function MemoItem({ memo, changeInfo }: Props) {
  const { isMemoOpen } = useSelector((state) => state.isMemoOpen);

  const dispatch = useDispatch();

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 65,
    active: isMemoOpen,
  });

  useEffect(() => {
    dispatch(toggleMemoOpen(memo !== '' ? true : false));
  }, []);

  const onChangeText = (value: string) => changeInfo({ memo: value });

  const onPress = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    dispatch(toggleMemoOpen(!isMemoOpen));
    if (!isMemoOpen) changeInfo({ memo: '' });
  };

  return (
    <View>
      <FormLabel label='메모' option isOpen={isMemoOpen} onPress={onPress} />

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
              style={tw.style(`border-0 h-full`, {
                lineHeight: 21,
                textAlignVertical: 'top', // android
              })}
              onChangeText={onChangeText}
              value={memo}
              placeholder='또다른 추가정보는 메모로 작성해주세요.'
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
        active={memo.length >= MEMO_MAX_LENGTH}
        color='orange'
        message={`메모는 ${MEMO_MAX_LENGTH}자를 넘을 수 없습니다.`}
      />
    </View>
  );
}
