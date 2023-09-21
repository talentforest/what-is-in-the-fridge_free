import { Animated, View } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput } from '../common/native-component';
import { useSlideAnimation } from '../../hooks';
import FormLabel from './FormLabel';
import tw from 'twrnc';

interface Props {
  memo: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function MemoItem({ memo, changeInfo }: Props) {
  const [isMemoOpen, setIsMemoOpen] = useState(false);

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 80,
    active: isMemoOpen,
  });

  useEffect(() => {
    if (memo !== '') {
      setIsMemoOpen(true);
    }
  }, []);

  const onChangeText = (value: string) => {
    changeInfo({ memo: value });
  };

  const onPress = () => {
    setIsMemoOpen((prev) => !prev);
    if (!isMemoOpen) {
      return changeInfo({ memo });
    }
    if (isMemoOpen) {
      return changeInfo({ memo: '' });
    }
  };

  return (
    <View style={tw`-mb-1`}>
      <FormLabel label='메모' option isOpen={isMemoOpen} onPress={onPress} />

      <Animated.View
        style={{
          height,
          overflow: 'hidden',
          marginHorizontal: -4,
          marginBottom: -6,
        }}
      >
        <View style={tw`flex-row items-center gap-1 px-1`}>
          <View
            style={tw.style(
              `h-16 py-1.5 flex-1 bg-white border border-slate-300 shadow-md flex-row items-center rounded-lg`,
              { lineHeight: 30 }
            )}
          >
            <TextInput
              style={tw`bg-white border-0 m-0.5 h-full flex-1 rounded-lg`}
              onChangeText={onChangeText}
              value={memo}
              placeholder='식료품에 대한 메모를 작성해주세요'
              multiline
              returnKeyType='done'
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
