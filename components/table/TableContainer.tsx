import { ReactNode } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { closeKeyboard } from '../../util';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
}

export default function TableContainer({ children }: Props) {
  return (
    <TouchableWithoutFeedback style={tw`flex-1`} onPress={closeKeyboard}>
      <View style={tw`flex-1`}>{children}</View>
    </TouchableWithoutFeedback>
  );
}
