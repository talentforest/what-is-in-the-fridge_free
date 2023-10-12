import { Animated, Keyboard, View } from 'react-native';
import { useEffect } from 'react';
import { TextInput } from '../common/native-component';
import { useSlideAnimation } from '../../hooks';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleMemoOpen } from '../../redux/slice/isMemoOpenSlice';
import { shadowStyle } from '../../constant/shadowStyle';
import { PlatformIOS } from '../../constant/statusBarHeight';
import FormLabel from './FormLabel';
import tw from 'twrnc';

interface Props {
  memo: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function MemoItem({ memo, changeInfo }: Props) {
  const { isMemoOpen } = useSelector((state) => state.isMemoOpen);

  const dispatch = useDispatch();

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 80,
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

    if (!isMemoOpen) {
      changeInfo({ memo: '' });
    }
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
              `h-17 px-0.5 py-${
                PlatformIOS ? '0.5' : '3'
              } flex-1 bg-white border border-slate-300 flex-row items-center rounded-lg`,
              shadowStyle(3)
            )}
          >
            <TextInput
              style={tw.style(`bg-white border-0 flex-1 h-full rounded-lg`, {
                lineHeight: 22,
                textAlignVertical: 'top', // android
              })}
              onChangeText={onChangeText}
              value={memo}
              placeholder='또다른 추가정보는 메모로 작성해주세요.'
              multiline
              numberOfLines={3}
              returnKeyType='done'
              blurOnSubmit={true}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
