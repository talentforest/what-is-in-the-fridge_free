import { ReactNode } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { BoxColor } from '../../screen-component/home/EntranceBox';
import { closeKeyboard } from '../../../util';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
  color: BoxColor;
}

export default function TableContainer({ children, color = 'slate' }: Props) {
  return (
    <TouchableWithoutFeedback style={tw`flex-1`} onPress={closeKeyboard}>
      <View
        style={tw`bg-${color}-50 flex-1 rounded-lg border border-slate-500`}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}
